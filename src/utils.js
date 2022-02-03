import { miniMax, sumRoots, wordsAtOrBelowLimit } from './scorers'

import _ from 'lodash'
import masterWords from './words.json'
import md5 from 'md5'
import spanishList from './data/valid-word-list-xl.json'
import starterList from './starterList.json'

export const getCanonical = (s, removeAccents = false) => {
  let canonical = s.slice()
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
  let result = key.toLocaleUpperCase().split('')
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
 * @param {string} key - The guessed word
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
 * Get correct letters in guess
 * @param {Object} guess
 * @param {string} guess.word - The guessed word
 * @param {string} guess.key - The returned evaluation for the word, e.g. `..YYG`
 */
const getCorrect = (guess) => {
  const { key, word } = guess
  return key.split('').map((k, i) => {
    if (k === 'G') {
      return word[i]
    }
    return false
  })
}

/**
 * Get letters present but not correct from word
 * @param {Object} guess
 * @param {string} guess.word - The guessed word
 * @param {string} guess.key - The returned evaluation for the word, e.g. `..YYG`
 */
const getPresent = (guess) => {
  const { key, word } = guess
  return key.split('').map((k, i) => {
    if (k === 'Y') {
      return word[i]
    }
    return false
  })
}

/**
 * Get letters absent from word
 * @param {Object} guess
 * @param {string} guess.word - The guessed word
 * @param {string} guess.key - The returned evaluation for the word, e.g. `..YYG`
 */
const getAbsent = (guess) => {
  const { key, word } = guess
  return key.split('').map((k, i) => {
    if (!'YG'.includes(k)) {
      return word[i]
    }
    return false
  })
}

/**
 * Test whether word matches guess criteria
 * @param {string} word - The word being evaluated for current `guess`
 * @param {Object} guess
 * @param {string} guess.word - The guessed word
 * @param {string} guess.key - The returned evaluation for the word, e.g. `..YYG`
 */
const testWord = (word, guess) => {
  let i
  let remains = getCanonical(word)

  const correct = getCorrect(guess)
  for (i = 0; i < correct.length; i++) {
    if (correct[i] && correct[i] !== remains[i]) {
      return false
    } else {
      if (correct[i]) {
        remains = replaceAtIndex(remains, i)
      }
    }
  }

  const present = getPresent(guess)
  for (i = 0; i < present.length; i++) {
    if (present[i] && (!remains.includes(present[i]) || remains[i] === present[i])) {
      return false
    } else {
      if (present[i]) {
        remains = remains.replace(present[i], '-')
      }
    }
  }

  const absent = getAbsent(guess)

  for (i = 0; i < absent.length; i++) {
    if (remains.includes(absent[i])) {
      return false
    }
  }
  return true
}

/**
 * Filter list of valid words using `guess`.
 * @param {Object} guess
 * @param {string} guess.word - The guessed word
 * @param {string} guess.key - The returned evaluation for the word, e.g. `..YYG`
 * @param {string[]} words - List of possible words
 */
export const filterWords = (guess, words) => {
  const filtered = words.filter((word) => {
    return testWord(word, guess)
  })
  return filtered
}

/**
 * Filter list of valid words using `answer`
 * @param {string} key - The returned evaluation for the word, e.g. `..YYG`
 * @param {string} answer - The correct answer
 * @param {string[]} words - List of possible words producing `key` from `answer`
 */
export const filterWordsWithAnswer = (key, answer, words) => {
  const filtered = words.filter((word) => {
    const wordKey = evaluateToString(word, answer)
    return key === wordKey
  })
  return filtered
}

export const getEliminatedCountWithAnswer = (key, answer, words) => {
  const originalLength = words.length
  const filtered = filterWordsWithAnswer(key, answer, words)
  return originalLength - filtered.length
}

/**
 * Get number of words eliminated from `words` by `guess`.
 * @param {string} guess - The guessed word
 * @param {string} answer - The correct answer
 * @param {string[]} words - List of possible words
 */
export const getEliminatedCount = (guess, answer, words) => {
  const originalLength = words.length

  const stringEval = evaluateToString(guess, answer)
  const filtered = filterWords({ word: guess, key: stringEval }, words)

  const eliminatedCount = originalLength - filtered.length

  return eliminatedCount
}

/**
 * Determine whether `word` is valid, given `guess`.
 * @param {string} word - The word being evaluated for current `guess`
 * @param {Object} guess
 * @param {string} guess.word - The guessed word
 * @param {string} guess.key - The returned evaluation for the word, e.g. `..YYG`
 */
export const isWordValid = (word, guess) => {
  let wordCopy = getCanonical(word)
  let guessWordCopy = getCanonical(guess.word)

  for (let i = 0; i < guessWordCopy.length; i++) {
    if (guess.key[i] === 'G') {
      if (wordCopy[i] !== guessWordCopy[i]) {
        return false
      } else {
        wordCopy = wordCopy.slice(0, i) + '-' + wordCopy.slice(i + 1)
      }
    } else if (guess.key[i] === 'Y') {
      if (!wordCopy.includes(guessWordCopy[i])) {
        return false
      } else {
        wordCopy = wordCopy.replace(guessWordCopy[i], '-')
      }
    } else {
      if (wordCopy.includes(guessWordCopy[i])) {
        return false
      }
    }
  }
  return true
}

/**
 * @param {string} str
 * @param {number} idx
 * @param {string} replacement
 */
const replaceAtIndex = (str, idx, replacement = '-') => {
  let newString = str.split('')
  newString[idx] = replacement
  return newString.join('')
}

/**
 * @param {string} guess - Guessed word
 * @param {string} answer - Correct answer
 */
export const evaluateToString = (guess, answer) => {
  let remainingAnswer = getCanonical(answer)
  let canonicalGuess = getCanonical(guess)
  const result = []
  for (let i = 0; i < canonicalGuess.length; i++) {
    if (canonicalGuess[i] === remainingAnswer[i]) {
      result[i] = 'G'
      remainingAnswer = replaceAtIndex(remainingAnswer, i)
    }
  }
  for (let i = 0; i < canonicalGuess.length; i++) {
    if (result[i]) {
      continue
    }
    if (remainingAnswer.includes(canonicalGuess[i])) {
      result[i] = 'Y'
      remainingAnswer = remainingAnswer.replace(canonicalGuess[i], '-')
    } else {
      result[i] = '-'
    }
  }
  return result.join('')
}

export const createEvaluator = (answer) => {
  const evaluator = (guess) => {
    const key = Array(guess.length).fill(null)
    const answerArray = getCanonical(answer).split('')
    const guessArray = getCanonical(guess).split('')

    for (let i = 0; i < guessArray.length; i++) {
      if (guessArray[i] === answerArray[i]) {
        key[i] = 'G'
        answerArray[i] = '-'
      }
    }

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
 * @param {Object} guess
 * @param {string} guess.word - The guessed word
 * @param {string} guess.key - The returned evaluation for the word, e.g. `..YYG`
 * @param {string[]} wordList
 */
export const analysisFilter = (guess, wordList) => {
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

export const getKeyDictionary = (word, wordList) => {
  const dictionary = Array(243)
    .fill(1)
    .reduce((accumulator, x, i) => {
      const key = numToKey(i)
      const matches = getAnswersMatchingKey(word, key, wordList).length
      if (matches !== 0) {
        return {
          ...accumulator,
          [key]: matches,
        }
      } else {
        return accumulator
      }
    }, {})
  // console.log('dict', dictionary)
  return dictionary
}

/**
 * Get number of matches in `wordList` for `word` using all possible keys
 * @param {string} word
 * @param {string[]} wordList
 */
export const getBins = (word, wordList) => {
  // const allKeys = getAllKeys()
  const bins = Array(243)
    .fill(1)
    .map((x, i) => {
      const key = numToKey(i)
      const matches = getAnswersMatchingKey(word, key, wordList).length
      return matches
    })
    .filter((v) => v !== 0)
  return bins.sort().reverse()
}

/**
 * Get number of matches in `wordList` for `word` using all possible keys
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
 * Get number of matches in `wordList` for `word` using all possible keys
 * @param {string} word
 * @param {string[]} wordList
 */
export const getBinsEfficiently = (word, wordList, dictionary = false) => {
  const allKeys = getPossibleKeys(word, wordList)
  const bins = allKeys.reduce((accumulator, key) => {
    const matches = getAnswersMatchingKey(word, key, wordList).length
    if (matches !== 0) {
      return {
        ...accumulator,
        [key]: matches,
      }
    } else {
      return accumulator
    }
  }, {})
  if (dictionary) {
    return bins
  }
  return Object.values(bins).sort().reverse()
}

/**
 * Get number of matches in `wordList` for `word` using all possible keys
 * @param {string} word
 * @param {string[]} wordList
 */
export const getBinsV2 = (word, wordList, dictionary = false, showMatches = false) => {
  const result = {}
  for (const answer of wordList) {
    const key = evaluateToString(word, answer)
    if (result[key]) {
      result[key] = showMatches ? [...result[key], answer] : result[key] + 1
    } else {
      result[key] = showMatches ? [answer] : 1
    }
  }
  if (dictionary) {
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
  const wordlist_hash = md5(JSON.stringify(wordList)).slice(0, 20)

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
    let bins = getBinsV2(word, wordList)

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
    const normalBins = getBinsV2(word, filteredList)
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
    const easyBins = getBinsV2(word, filteredList)
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

  proportion = getProportionOfWordsInBinsBelowLimit(getBinsV2(best.word, filteredList), limit)

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
