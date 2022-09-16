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
 * produced using `word` (potential guess) and `wordList` (all possible remaining answers),
 * and values will be either the count of words
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
  for (const guess of wordList) {
    if (guess === answer) {
      continue
    }
    const key = evaluateToString(guess, answer)
    const filtered = filterWordsUsingGuessResult(
      {
        word: guess,
        key,
      },
      wordList,
    )
    if (stop_after_one && filtered.length === 1) {
      return [
        {
          word: guess,
          filtered,
          key,
        },
      ]
    }
    results.push({
      word: guess,
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

/*
  * Returns a list of words that are guesses for the given word.
  * @param {string[]} wordList
  * @param {Object[]} guesses
  * @param {string} guesses.word - the guessed word
  * @param {string} guesses.key - the key for the guess
*/
export const applyGuesses = (wordList, guesses) => {
  let filteredWords = wordList.slice()
  for (const guess of guesses) {
    filteredWords = filterWordsUsingGuessResult(guess, filteredWords)

    // If we have narrowed the list to one word, we can return early
    if (filteredWords.length === 1) {
      return filteredWords
    }
  }

  return filteredWords
}

export function decompress(text) {
  let lastword = 'zzzzz'
  let words = []
  let i = 0
  let j = 0
  let word
  while (j <= text.length) {
    if ((text.charCodeAt(j) < 96 || j == text.length) && j > i) {
      word = (lastword.slice(0, 5 - (j - i)) + text.slice(i, j)).toLowerCase()
      words.push(word)
      lastword = word
      i = j
    }
    j++
  }
  return words.map((w) => w.toUpperCase())
}

/**
 * @param {string[]} guessList - List of guessed words
 */

export function getUnusedLetters(guessList) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
  const usedLetters = guessList.reduce((acc, guess) => {
    return acc + guess
  }, '')
  return letters.split('').filter((letter) => !usedLetters.includes(letter))
}

export const getUnusedLetterCountInWord = (word, unusedLetters) => {
  return word
    .split('')
    .map((letter) => unusedLetters.includes(letter))
    .filter((r) => r).length
}

/**
 * With a list of guesses, return an array of letters which are used in the word but with unknown positions
 * @param {Object[]} guesses
 * @param {string} guesses[].word
 * @param {string} guesses[].key
 */

export function getYellowLettersInGuesses(guesses) {
  const exampleGuesses = [
    {
      word: 'HELLO',
      key: 'GY-Y-',
    },
  ]

  let yellowLetters = exampleGuesses.reduce((acc, guess) => {
    console.log(acc)
    return [
      ...acc,
      ...guess.word
        .split('')
        .map((letter, index) => {
          if (guess.key[index] === 'Y') {
            return letter
          }
        })
        .filter((r) => r),
    ]
  }, [])

  console.log(yellowLetters)

  // return guesses.reduce((acc, guess) => {
  //   return acc + guess.key.split('').filter((letter) => letter === 'Y').length
  // }, 0)
}

export function getNextGuess(guessList, wordList) {
  const unusedLetters = getUnusedLetters(guessList)
  const unusedWords = wordList.filter((word) => !guessList.includes(word))
  const unusedLettersInWords = unusedWords.map((word) =>
    getUnusedLetterCountInWord(word, unusedLetters),
  )
  console.log(unusedLettersInWords)

  // console.log(_.shuffle(unusedWordsWithLetters.slice(0, 25)))
  // return unusedWordsWithLetters[0]
}

/**
 * @param {string[]} guessList - List of guessed words
 */
export const getUniqueLetters = (guessList) => {
  return _.uniq(guessList.join('').split('')).join('')
}

/**
 * @param {string[]} guessList - List of guessed words
 */
export const countUniqueLetters = (guessList) => {
  return getUniqueLetters().length
}

/**
 * @param {string[]} guessList - List of guessed words
 * @param {string} word
 */

export const getNewLetterCountInWord = (usedLetters, word) => {
  const usedLettersArray = usedLetters.split('')
  const result = word.split('').filter((letter) => {
    const result = !usedLettersArray.includes(letter)
    if (result) {
      usedLettersArray.push(letter)
    }
    return result
  })
  return result.length
}

export const orderWordsByNewLetters = (wordList, guessList) => {
  const usedLetters = getUniqueLetters(guessList)

  return _.orderBy(
    wordList.map((word) => {
      return {
        word,
        count: getNewLetterCountInWord(usedLetters, word),
      }
    }),
    (a) => a.count,
    'desc',
  )
}

/**
 * @param {string[]} guesses - List of guessed words
 * @param {string} answer
 */

export const guessesIdentifyAnswer = (guesses, answer, wordList) => {
  const guessList = guesses.map((guess) => {
    return {
      word: guess.toUpperCase(),
      key: evaluateToString(guess, answer),
    }
  })

  const remaining = applyGuesses(wordList, guessList)

  return remaining.length === 1
}

export const getPercentageIdentified = (guesses, wordList) => {
  let identified = 0

  for (const answer of wordList) {
    if (guessesIdentifyAnswer(guesses, answer, wordList)) {
      identified++
    }
  }

  return {
    identified,
    total: wordList.length,
    percentage: (identified / wordList.length) * 100,
  }
}
