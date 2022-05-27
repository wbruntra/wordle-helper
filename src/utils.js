import { miniMax, sumRoots, wordsAtOrBelowLimit } from './scorers'

import _ from 'lodash'
import masterWords from './words.json'
import md5 from 'md5'
import spanishList from './data/valid-word-list-xl.json'
import starterList from './starterList.json'

export const getCanonical = (s, removeAccents = false) => {
  let canonical = s.slice().trim()
  const accents = {
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U',
    Ü: 'U',
  }
  if (removeAccents) {
    _.forEach(accents, (plainVowel, accented) => {
      canonical = canonical.replace(accented, plainVowel)
    })
  }

  return canonical
}

/**
 * @param {string} key
 */
export const getCanonicalKey = (key) => {
  let result = key.toLocaleUpperCase().trim().split('')
  result = result.map((k) => {
    if ('YG'.includes(k)) {
      return k
    }
    return '-'
  })
  return result.join('')
}

/**
 * Get all words that produce given key from guess
 * @param {string} guess - The guessed word
 * @param {string} key - The returned key
 * @param {string[]} wordList
 */
export const getAnswersMatchingKey = (guess, key, wordList) => {
  const canonicalKey = getCanonicalKey(key)
  const result = wordList.filter((word) => {
    const tempKey = evaluateToString(guess, word)
    return canonicalKey === tempKey
  })
  return result
}

export const guessReverser = (answer, key, wordList) => {
  const canonicalKey = getCanonicalKey(key)
  const result = wordList.filter((word) => {
    const tempKey = evaluateToString(word, answer)
    return canonicalKey === tempKey
  })
  return result
}

/**
 * Create common `evaluation` for guess and answer pair
 * @param {string} guess - The guessed word
 * @param {string} answer - The correct answer
 */
export const evaluate = (guess, answer) => {
  let remainingAnswer = getCanonical(answer)
  const result = []
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = {
        exact: true,
        present: true,
        name: guess[i],
        code: 'G',
      }
      remainingAnswer = remainingAnswer.replace(guess[i], '-')
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (result[i]) {
      continue
    }
    if (remainingAnswer.includes(guess[i])) {
      result[i] = {
        exact: false,
        present: true,
        name: guess[i],
        code: 'Y',
      }
      remainingAnswer = remainingAnswer.replace(guess[i], '-')
    } else {
      result[i] = {
        exact: false,
        present: false,
        name: guess[i],
        code: '-',
      }
    }
  }
  return result
}

/**
 * Return evaluation key (e.g. `YG..Y`) for given `guess` and `answer`
 * @param {string} guess - Guessed word
 * @param {string} answer - Correct answer
 */
export const evaluateToString = (guess, answer) => {
  let remainingAnswer = getCanonical(answer)
  let canonicalGuess = getCanonical(guess)

  const evaluator = createEvaluator(remainingAnswer)
  return evaluator(canonicalGuess)
}

/**
 * Given the correct `answer`, return an evaluator function
 * which takes `guess` and returns the appropriate key
 * @param {string} answer
 */
export const createEvaluator = (answer) => {
  /**
   * @param {string} guess
   */
  const evaluator = (guess) => {
    const key = Array(guess.length).fill(null)
    const answerArray = getCanonical(answer).split('')
    const guessArray = getCanonical(guess).split('')

    // First pass: only get correct (GREEN) letters
    for (let i = 0; i < guessArray.length; i++) {
      if (guessArray[i] === answerArray[i]) {
        key[i] = 'G'
        answerArray[i] = '-'
      }
    }

    // Second pass: distinguish YELLOW from BLACK letters
    for (let i = 0; i < guessArray.length; i++) {
      if (key[i] === 'G') {
        continue
      }
      if (answerArray.indexOf(guessArray[i]) !== -1) {
        key[i] = 'Y'
        answerArray[answerArray.indexOf(guessArray[i])] = '-'
      } else {
        key[i] = '-'
      }
    }

    return key.join('')
  }

  return evaluator
}

export const compareEvaluations = (answer, guess1, guess2) => {
  const evaluator = createEvaluator(answer)
  return evaluator(guess1) === evaluator(guess2)
}

/**
 * After making a guess, given the guessed word and the received evaluation for that word, filter `wordList` for words
 * matching that evaluation
 * @param {Object} guess
 * @param {string} guess.word - The guessed word
 * @param {string} guess.key - The returned evaluation for the word, e.g. `..YYG`
 * @param {string[]} wordList
 */
export const filterWordsUsingGuessResult = (guess, wordList) => {
  const result = wordList.filter((potentialAnswer) => {
    const evaluator = createEvaluator(potentialAnswer)
    const potentialKey = evaluator(guess.word)
    return potentialKey === guess.key
  })
  return result
}

/**
 * @param {Number} n - Number
 */
export const numToKey = (n) => {
  const s = ('00000' + n.toString(3)).slice(-5)
  return s
    .split('')
    .map((i) => {
      switch (i) {
        case '0':
          return '-'
        case '1':
          return 'Y'
        case '2':
          return 'G'
      }
    })
    .join('')
}

export const getAllKeys = () => {
  return Array(243)
    .fill(1)
    .map((x, i) => numToKey(i))
}

/**
 * Get all possible evaluations (keys) from comparing `word` against `wordList`
 * @param {string} word
 * @param {string[]} wordList
 */
export const getPossibleKeys = (word, wordList) => {
  const result = wordList.map((answer) => {
    return evaluateToString(word, answer)
  })
  return _.uniq(result).sort()
}

/**
 * Create an Object where the keys will be all possible answer keys (e.g. `YY..G`) 
 * produced using `word` and `wordList`, and values will be either the count of words
 * in wordlist producing the corresponding key or the array of words from `wordList`
 * producing that key.
 * 
 * This is useful for understanding how well a given `word` can be expected to
 * divide a `wordList` into distinct "bins", i.e. how many possible words we expect to have left
 * after making a guess.
 * 
 * Function can either return the Object or a sorted array of the word counts corresponding to the
 * possible keys. A perfect sorter would produce an array consisting of all `1`'s, the worst possible
 * sorter would simply contain one number, `[wordList.length]`
 * @param {string} word
 * @param {string[]} wordList
 */
export const getBins = (word, wordList, { returnObject = false, showMatches = false } = {}) => {
  const result = {}
  for (const answer of wordList) {
    const key = evaluateToString(word, answer)
    if (result[key]) {
      result[key] = showMatches ? [...result[key], answer] : result[key] + 1
    } else {
      result[key] = showMatches ? [answer] : 1
    }
  }
  if (returnObject) {
    return result
  }
  return Object.values(result).sort().reverse()
}

export const getProportionOfWordsInBinsBelowLimit = (bins, limit) => {
  const totalWords = _.sum(bins)
  const filteredBins = bins.filter((size) => size < limit)
  const lessThanLimitWords = _.sum(filteredBins)
  return lessThanLimitWords / totalWords
}

export const getBestChoice = async (
  wordList,
  fullWordList,
  {
    scoring_method = 'random',
    verbose = false,
    bin_limit = 1,
    strictness_proportion = 1,
    db,
  } = {},
) => {
  if (wordList.length === 1) {
    return { word: wordList[0], score: 999 }
  }
  const wordlist_hash = md5(JSON.stringify(wordList))

  let scorer
  let best

  switch (scoring_method) {
    case 'easy_mode':
      const overallBest = getBestHitFromFullList(wordList, fullWordList, {
        limit: bin_limit,
        strictness_proportion: strictness_proportion,
        verbose,
      })
      if (db) {
        await db('cached_evaluations').insert({
          best_word: overallBest.word,
          score: overallBest.score,
          wordlist_hash,
          method: scoring_method,
        })
      }

      return overallBest
    case 'most_in_bins':
      scorer = wordsAtOrBelowLimit(bin_limit)
      break
    case 'sum_roots':
      scorer = sumRoots
      break
    case 'minimax':
      scorer = miniMax
      break
    case 'random':
      return {
        word: _.sample(wordList),
      }
  }

  if (db) {
    best = await getCachedAnswer(wordlist_hash, scoring_method, db)

    if (best) {
      return best
    }
  }

  const result = []

  for (const word of wordList) {
    let bins = getBins(word, wordList)

    result.push({
      word,
      score: scorer(bins),
    })
  }

  best = _.maxBy(result, (r) => r.score)

  const entry = {
    best_word: best.word,
    score: best.score,
    wordlist_hash,
    method: scoring_method,
  }

  if (db) {
    await db('cached_evaluations').insert(entry)
  }

  return best
}

export const getBestHitFromFullList = (
  filteredList,
  allWords,
  { limit = 1, verbose = false, strictness_proportion = 1, get_all_matches = false },
) => {
  const scorer = wordsAtOrBelowLimit(limit)

  const acceptable_unique_proportion = strictness_proportion

  const filteredScores = []
  let proportion

  for (const word of filteredList) {
    const normalBins = getBins(word, filteredList)
    const score = scorer(normalBins)
    filteredScores.push({
      word,
      score,
    })
  }

  const bestFiltered = _.maxBy(filteredScores, (o) => o.score)

  if (verbose) {
    console.log(`${filteredList.length} left. Best filtered`, bestFiltered)
  }

  if (bestFiltered.score >= acceptable_unique_proportion * filteredList.length) {
    verbose && console.log(`Returning filtered ${bestFiltered.word}`)
    return {
      word: bestFiltered.word,
      score: bestFiltered.score,
    }
  }

  const allScores = []

  for (const word of allWords) {
    const easyBins = getBins(word, filteredList)
    const score = scorer(easyBins)
    if (score === filteredList.length) {
      verbose && console.log(`Found word to discover answer with certainty:`, word, score)
      return {
        word,
        score,
      }
    } else {
      allScores.push({
        word,
        score,
      })
    }
  }

  const best = _.maxBy(allScores, (o) => o.score)

  if (verbose) {
    console.log(`Best overall`, best)
  }

  proportion = getProportionOfWordsInBinsBelowLimit(getBins(best.word, filteredList), limit)

  verbose && console.log(`End. Returning ${best.word}`)
  return best
}

const getCachedAnswer = async (wordlist_hash, method, db) => {
  const bestWord = await db('cached_evaluations')
    .select()
    .where({
      wordlist_hash,
      method,
    })
    .first()

  if (!bestWord) {
    return null
  }

  return {
    word: bestWord.best_word,
    score: bestWord.score,
  }
}

export const reclassifyAllForAnswer = (answer, wordList, { stop_after_one = false }) => {
  let results = []
  for (const word of wordList) {
    if (word === answer) {
      continue
    }
    const key = evaluateToString(word, answer)
    const filtered = filterWordsUsingGuessResult(
      {
        word,
        key,
      },
      wordList,
    )
    if (stop_after_one && filtered.length === 1) {
      return [
        {
          word,
          filtered,
          key,
        },
      ]
    }
    results.push({
      word,
      filtered,
      key,
    })
  }

  results = results.filter((a) => a.filtered.length === 1)
  results = _.orderBy(results, (a) => a.filtered.length, 'asc')
  return results
}

export const isGuessableInOne = (answer, wordList) => {
  let classifiedKeys = reclassifyAllForAnswer(answer, wordList, { stop_after_one: true })
  let result = classifiedKeys.filter((r) => r.filtered.length === 1)
  console.log(answer, result[0])
  return result.length > 0
}
