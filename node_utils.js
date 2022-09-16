const _ = require('lodash')
const md5 = require('md5')
const crypto = require('crypto')
const fullList = require('./results/dordle-valid.json')

const getCanonical = (s, removeAccents = false) => {
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
const getCanonicalKey = (key) => {
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
const getAnswersMatchingKey = (guess, key, wordList) => {
  const canonicalKey = getCanonicalKey(key)
  const result = wordList.filter((word) => {
    const tempKey = evaluateToString(guess, word)
    return canonicalKey === tempKey
  })
  return result
}

const guessReverser = (answer, key, wordList) => {
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
const evaluate = (guess, answer) => {
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

const evaluateForPoints = (guess, answer, { green = 5, yellow = 3 } = {}) => {
  let total = 0

  let guessCopy = guess.split('')
  let answerCopy = answer.split('')
  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === answerCopy[i]) {
      total += green
      guessCopy[i] = null
      answerCopy[i] = null
    }
  }
  for (i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === null) {
      continue
    }
    if (answerCopy.includes(guessCopy[i])) {
      total += yellow
      answerCopy[answerCopy.indexOf(guessCopy[i])] = null
    }
  }
  return total
}

const evaluateAllForPoints = (guess, answerCandidates, { green = 5, yellow = 3 } = {}) => {
  return _.sum(
    answerCandidates.map((answer) => evaluateForPoints(guess, answer, { green, yellow })),
  )
}

/**
 * Return evaluation key (e.g. `YG..Y`) for given `guess` and `answer`
 * @param {string} guess - Guessed word
 * @param {string} answer - Correct answer
 */
const evaluateToString = (guess, answer) => {
  let remainingAnswer = getCanonical(answer)
  let canonicalGuess = getCanonical(guess)

  const evaluator = createEvaluator(remainingAnswer)
  return evaluator(canonicalGuess)
}

/**
 * Determine if `guess` will identify the solution among `wordList`
 */
const solutionGuaranteed = (guess, wordList) => {
  const evaluations = []
  for (const answer of wordList) {
    const evaluation = evaluateToString(guess, answer)
    if (evaluations.includes(evaluation)) {
      return false
    } else {
      evaluations.push(evaluation)
    }
  }
  return true
}

/**
 * Determine if any guess will identify the solution among `wordList`
 */
const hasSolution = (candidateAnswers, allWords, { cheat = false } = {}) => {
  if (cheat && candidateAnswers.length === 1) {
    return candidateAnswers[0]
  }
  if (cheat && candidateAnswers.length > 15) {
    return false
  }
  for (const guess of candidateAnswers) {
    for (const answer of candidateAnswers) {
      if (solutionGuaranteed(guess, candidateAnswers)) {
        return guess
      }
    }
  }
  // Failed to find a solution, try the whole list
  for (const guess of allWords) {
    for (const answer of candidateAnswers) {
      if (solutionGuaranteed(guess, candidateAnswers)) {
        return guess
      }
    }
  }

  return false
}

const rankCandidatesByPoints = (answerCandidates, { green = 5, yellow = 3 } = {}) => {
  const ranks = answerCandidates.map((candidate) => {
    return {
      candidate,
      points: evaluateAllForPoints(candidate, answerCandidates, { green, yellow }),
    }
  })
  return _.orderBy(ranks, ['points'], ['desc'])
}

const rankCandidatesByPointsMultiple = (answerCandidateArrays, { green = 5, yellow = 3 } = {}) => {
  // Combine all candidates into one array
  let allCandidates = _.flatten(answerCandidateArrays)
  allCandidates = _.uniq(allCandidates)

  // return(allCandidates)
  allCandidates = _.reduce(
    allCandidates,
    (result, candidate) => {
      result[candidate] = 0
      result = {
        ...result,
        [candidate]: 0,
      }
      return result
    },
    {},
  )

  // Give points to each candidate
  for (const answerCandidates of answerCandidateArrays) {
    const ranks = rankCandidatesByPoints(answerCandidates, { green, yellow })
    for (const item of ranks) {
      allCandidates[item.candidate] = allCandidates[item.candidate] + item.points
    }
  }

  // Sort by points
  let results = _.map(allCandidates, (val, key) => {
    return {
      word: key,
      points: val,
    }
  })

  results = _.orderBy(results, 'points', 'desc')
  // console.log(results)
  return results
}

/**
 * Given the correct `answer`, return an evaluator function
 * which takes `guess` and returns the appropriate key
 * @param {string} answer
 */
const createEvaluator = (answer) => {
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

const getRedisKey = (wordlist_hash, guesses, answer) => {
  const data = [...guesses].sort().join('')
  // const guessKey = createHash('md5').update(data).digest("hex")

  return `${wordlist_hash}-${data}-${answer}`
}

const getRedisCachedResult = async (wordlist_hash, guesses, answer) => {
  const redisClient = require('./redis_connection')

  const key = getRedisKey(wordlist_hash, guesses, answer)
  const cachedResult = await redisClient.get(key)
  if (cachedResult) {
    return JSON.parse(cachedResult)
  }
  return null
}

/**
 * After making a guess, given the guessed word and the received evaluation for that word, filter `wordList` for words
 * matching that evaluation
 * @param {Object} guess
 * @param {string} guess.word - The guessed word
 * @param {string} guess.key - The returned evaluation for the word, e.g. `..YYG`
 * @param {string[]} wordList
 */
const filterWordsUsingGuessResult = (guess, wordList) => {
  const result = wordList.filter((potentialAnswer) => {
    const evaluator = createEvaluator(potentialAnswer)
    const potentialKey = evaluator(guess.word)
    return potentialKey === guess.key
  })
  return result
}

/*
  Given a list of words and a list of guesses, return the list of words that match the guesses
*/
const applyGuesses = (wordList, guesses) => {
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

function decompress(text) {
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

function getUnusedLetters(guessList) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
  const usedLetters = guessList.reduce((acc, guess) => {
    return acc + guess
  }, '')
  return letters.split('').filter((letter) => !usedLetters.includes(letter))
}

const getUnusedLetterCountInWord = (word, unusedLetters) => {
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

function getYellowLettersInGuesses(guesses) {
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

function getNextGuess(guessList, wordList) {
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
const getUniqueLetters = (guessList) => {
  return _.uniq(guessList.join('').split('')).join('')
}

/**
 * @param {string[]} guessList - List of guessed words
 */
const countUniqueLetters = (guessList) => {
  return getUniqueLetters().length
}

/**
 * @param {string[]} guessList - List of guessed words
 * @param {string} word
 */

const getNewLetterCountInWord = (usedLetters, word) => {
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

const orderWordsByNewLetters = (wordList, guessList) => {
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

const guessesIdentifyAnswer = (guesses, answer, wordList) => {
  const guessList = guesses.map((guess) => {
    return {
      word: guess.toUpperCase(),
      key: evaluateToString(guess, answer),
    }
  })

  const remaining = applyGuesses(wordList, guessList)

  return remaining.length === 1
}

const getPercentageIdentified = (
  guesses,
  wordList,
  { estimate = false, suggestNext = false, returnNonIdentified = false } = {},
) => {
  let identified = 0
  const nonidentified = []
  const answerSample = estimate ? _.sampleSize(wordList, 400) : wordList

  for (const answer of answerSample) {
    if (guessesIdentifyAnswer(guesses, answer, wordList)) {
      identified++
    } else {
      nonidentified.push(answer)
    }
  }

  const result = {
    identified,
    total: wordList.length,
    percentage: `${((100 * identified) / answerSample.length).toString().slice(0, 4)}%`,
  }

  if (returnNonIdentified) {
    result.nonidentified = nonidentified
  }

  if (suggestNext && nonidentified.length > 0) {
    const ordered = orderEntireWordList(nonidentified)
    result.suggestNext = ordered[0].word
    result.nextIdentifiedPct = getPercentageIdentified([...guesses, result.suggestNext], wordList)
  }

  return result
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
 * @param {Object} options
 * @param {boolean} options.returnObject - If true, return the Object, otherwise return an array of word counts
 * @param {boolean} options.showMatches - If true, return the actual list of words, otherwise just the word counts
 *
 * @returns {Object|number[]}
 */
const getBins = (word, wordList, { returnObject = false, showMatches = false } = {}) => {
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

const evaluateKey = (
  key,
  weightings = {
    G: 3,
    Y: 2,
    '-': 0,
  },
) => {
  const result = key.split('').reduce((acc, c) => {
    return acc + weightings[c]
  }, 0)
  return result
}

const weightKeys = (
  fullBins,
  weightings = {
    G: 3,
    Y: 2,
    '-': 0,
  },
) => {
  const result = _.sum(
    _.map(fullBins, (binItem, key) => {
      const val = evaluateKey(key, weightings)
      return binItem * val
    }),
  )
  return result
}

/**
 * Create a scorer to count the number of words appearing in bins of size no greater than `limit`
 * @param {number} limit
 */
const wordsAtOrBelowLimit = (limit) => {
  /**
   * Count the number of words appearing in bins of size no greater than `limit`
   * @param {Number[]} bins - result of `getBins`
   */
  const binScorer = (bins) => {
    const small = bins.filter((size) => size <= limit)
    return _.sum(small)
  }
  return binScorer
}

const orderEntireWordList = (
  filteredList,
  { only_filtered = false, orderByWeight = false, startingList = fullList } = {},
) => {
  const maximizeUniqueness = wordsAtOrBelowLimit(1)
  // Ordering all the words takes too much time, so we just return
  if (filteredList.length === startingList.length) {
    return []
  }
  let results

  // We always perform the analysis of `filteredList` because if a word is found
  // to solve with 100% probability, we can stop

  results = filteredList.map((word) => {
    const fullBins = getBins(word, filteredList, { returnObject: true })
    const bins = Object.values(fullBins)
    return {
      word,
      score: maximizeUniqueness(bins),
      weightedScore: weightKeys(fullBins) / (filteredList.length * 15),
    }
  })

  const filteredOrder = _.orderBy(results, (o) => o.score, 'desc')
  if (!(only_filtered || filteredOrder[0].score === filteredList.length)) {
    results = startingList.map((word) => {
      const fullBins = getBins(word, filteredList, { returnObject: true })
      const bins = Object.values(fullBins)
      return {
        word,
        score: maximizeUniqueness(bins),
        weightedScore: weightKeys(fullBins) / (filteredList.length * 15),
      }
    })
  }

  if (orderByWeight) {
    return _.orderBy(results, (o) => o.weightedScore, 'desc')
  }

  return _.orderBy(results, (o) => o.score, 'desc')
}

const allExports = {
  getPercentageIdentified,
  guessesIdentifyAnswer,
  applyGuesses,
  orderWordsByNewLetters,
  createEvaluator,
  getBins,
  guessReverser,
  evaluateToString,
  getUniqueLetters,
  evaluateForPoints,
  evaluateAllForPoints,
  rankCandidatesByPoints,
  rankCandidatesByPointsMultiple,
  solutionGuaranteed,
  wordsAtOrBelowLimit,
  orderEntireWordList,
  hasSolution,
}

module.exports = allExports
