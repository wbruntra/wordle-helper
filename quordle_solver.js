const utils = require('./node_utils')
const wordList = require('./results/official-answers.json')
const validWords = require('./results/dordle-valid.json')
const _ = require('lodash')
const { applyGuesses } = require('./node_utils')

const getKeys = (guesses, answer) => {
  return guesses.map((guess) => {
    return {
      word: guess,
      key: utils.evaluateToString(guess, answer),
    }
  })
}

const combineCounts = (objects) => {
  const result = {}
  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      if (!result[key] || result[key] < value) {
        result[key] = value
      }
    }
  }
  return result
}

const getLetterHitCount = (guess) => {
  const counts = {}
  for (let i = 0; i < guess.word.length; i++) {
    if ('YG'.includes(guess.key[i])) {
      if (counts[guess.word[i]]) {
        counts[guess.word[i]]++
      } else {
        counts[guess.word[i]] = 1
      }
    }
  }
  return counts
}

const getKnownLetters = (guesses) => {
  const combined = combineCounts(guesses.map((g) => getLetterHitCount(g)))
  let knownLetters = _.map(combined, (count, letter) => {
    return letter.repeat(count)
  }).join('')
  return knownLetters
}

const getProcessedGuesses = (answer, guessList) => {
  const guesses = guessList.map((guess) => {
    return {
      word: guess,
      key: utils.evaluateToString(guess, answer),
    }
  })
  return guesses
}

const wordHasAllKnownLetters = (word, knownLetters) => {
  let remains = word.split('')
  for (const letter of knownLetters) {
    const index = remains.indexOf(letter)
    if (index === -1) {
      return false
    }
    remains.splice(index, 1)
  }
  return true
}

const getRemainingWords = (answer, guessList, wordList) => {
  const guesses = getProcessedGuesses(answer, guessList)
  const knownLetters = getKnownLetters(guesses)
  console.log(knownLetters)
  return utils.applyGuesses(wordList, guesses)
}

const getAllRemainingWords = (answers, guessList, validWords) => {
  return answers.map((answer) => {
    return getRemainingWords(answer, guessList, validWords)
  })
}

/**
  Determine whether `guesses` will identify the solution among `remainingWords`
*/
const newGuessIdentifiesSolution = (guess, oldGuesses, remainingWords) => {
  const initialFilter = applyGuesses(remainingWords, oldGuesses)
}

/**
  Determine whether `guess` will identify the solution among `remainingWords`
*/
const guessIdentifiesSolution = (guess, remainingWords) => {
  return utils.solutionGuaranteed(guess, remainingWords)
}

/**
  Filter remaining candidates by determining which words will identify the solution
*/
const filterCandidates = (remainingList, candidates) => {
  return candidates.filter((guess) => {
    const identified = guessIdentifiesSolution(guess, remainingList)
    return identified
  })
}

/**
  Try to find a word that will solve all remaining word lists
*/
const lookForPerfectGuess = (remainingLists, initialCandidates) => {
  let guessCandidates = [...initialCandidates]

  // For each potential `guess`, go through each list of remaining words. If it does not
  // identify the solution for some list, filter it out.
  guessCandidates = guessCandidates.filter((guess) => {
    for (const remainingList of remainingLists) {
      const identified = guessIdentifiesSolution(guess, remainingList)
      if (!identified) {
        return false
      }
    }
    return true
  })
  return guessCandidates
}

const getNextGuess = (remainingWords, { useAllWords = true } = {}) => {
  let guessCandidates = useAllWords ? [...validWords] : _.flatten(remainingWords)

  let shortestList = remainingWords[0]
  // If any remaining word list is length 1, return that word
  for (let i = 0; i < remainingWords.length; i++) {
    const words = remainingWords[i]
    if (words.length === 1) {
      return {
        word: words[0],
        withCertainty: true,
      }
    }
    if (words.length < shortestList.length) {
      shortestList = words
    }
  }

  // console.log('None solvable', remainingWords)

  if (remainingWords.length === 1) {
    if (shortestList.length === 2) {
      return {
        word: _.sample(shortestList),
        withCertainty: false,
      }
    }
  }

  // const ranks = utils.rankCandidatesByPointsMultiple(remainingWords)
  // console.log('all', ranks)

  guessCandidates = lookForPerfectGuess(remainingWords, guessCandidates)
  const flatWords = _.flatten(remainingWords)
  const intersectingGuesses = _.intersection(flatWords, guessCandidates)
  if (intersectingGuesses.length > 0) {
    return {
      word: intersectingGuesses[0],
      withCertainty: false,
    }
  }

  // return {
  //   word: ranks[0].word,
  //   withCertainty: false,
  // }

  if (shortestList.length === 2) {
    return {
      word: _.sample(shortestList),
      withCertainty: false,
    }
  }

  if (guessCandidates.length > 0) {
    return {
      word: guessCandidates[0],
      withCertainty: false,
    }
  }

  // Attempt #3, just guess a word at random from the shortest list
  return {
    word: _.sample(shortestList),
    withCertainty: false,
  }
  // let maxPoints = { points: 0, word: null }

  // for (let i = 0; i < remainingWords.length; i++) {
  //   const words = remainingWords[i]

  //   if (words.length === 2) {
  //     return words[0]
  //   }
  // }

  // Otherwise, return the word that is in the shortest list
}

const reconstituteWord = (guesses) => {
  let result = Array(guesses[0].word.length).fill('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  const knownLetters = getKnownLetters(guesses)
  for (const guess of guesses) {
    const key = guess.key
    const word = guess.word
    for (let i = 0; i < key.length; i++) {
      const char = key[i]
      if (char === 'G') {
        result[i] = word[i]
      } else if (char === 'Y') {
        result[i] = result[i].replace(word[i], '')
      } else {
        result[i] = result[i].replace(word[i], '')
      }
    }
  }
  return result
}

const wordleSolve = (answer, { startingGuesses = ['DUCHY', 'FLING', 'STAMP', 'BROKE'] } = {}) => {
  let guessList = [...startingGuesses.slice(0, 4)]

  while (guessList.length < 5) {
    const remainingWords = getRemainingWords(answer, guessList, validWords)
    if (remainingWords.length === 1) {
      guessList.push(remainingWords[0])
      return {
        success: remainingWords[0] === answer,
        finalRemaining: remainingWords,
      }
    }
    const nextGuess = utils.orderEntireWordList(remainingWords)[0]
    guessList.push(nextGuess.word)
  }

  const finalRemaining = getRemainingWords(answer, guessList, validWords)
  return {
    success: finalRemaining.length === 1 && finalRemaining[0] === answer,
    finalRemaining,
  }
}

const play = ({
  startingGuesses = ['DUCHY', 'FLING', 'STAMP', 'BROKE'],
  answers = null,
  verbose = false,
  startingWords = 3,
  maxGuesses = 9,
} = {}) => {
  if (!answers) {
    answers = _.shuffle(wordList).slice(0, 4)
  }
  const originalAnswers = [...answers]
  // console.log(answers)

  let guessQueue = [...startingGuesses]
  // guessQueue = ['BEACH', 'DRIFT', 'LUMPY', 'GNOWS']

  let guessList = []
  for (let i = 0; i < startingWords; i++) {
    guessList.push(guessQueue.shift())
  }

  let remainingWords
  console.log(answers)
  while (answers.length > 0 && guessList.length < maxGuesses) {
    for (const guess of guessList) {
      if (answers.includes(guess)) {
        // console.log('Found answer:', guess)
        answers = _.without(answers, guess)
      }
    }
    if (answers.length === 0) {
      break
    }
    remainingWords = getAllRemainingWords(answers, guessList, validWords)
    const nextGuess = getNextGuess(remainingWords, {
      useAllWords: guessList.length < maxGuesses - answers.length,
    })

    let nextWord = nextGuess.word
    if (!_.isEmpty(guessQueue) && !nextGuess.withCertainty) {
      nextWord = guessQueue.shift()
    }
    // console.log('Next guess:', nextGuess)
    guessList.push(nextWord)
  }

  if (verbose) {
    console.log('Final guess list:', guessList, `${guessList.length} guesses`)
  }

  const remainingAnswers = _.without(originalAnswers, ...guessList)
  if (remainingAnswers.length > 0) {
    console.log('Did not solve, remaining answers:', remainingAnswers)
    return { success: false, guessList, remainingAnswers }
  }
  return { success: true, guessList }
}

const run = () => {
  let success = 0
  let total = 0
  let result
  let results = []
  while (total < 100) {
    total++
    result = play({ startingWords: 4 })
    if (result.success) {
      success++
      results.push(result.guessList.length)
    }
  }
  console.log(
    'Counts:',
    _.countBy(results, (x) => x),
  )
  console.log(`${success} / ${total}`)
}

let testAnswers
// testAnswers = ['MELON', 'VAUNT', 'CLACK', 'WRIST']
// testAnswers = ['TODAY', 'DWELL', 'WRING', 'TACIT']
testAnswers = ['DEVIL', 'MURAL', 'SNEAK', 'LEGGY']
testAnswers = ['PAPER', 'LOWLY', 'CHAFF', 'SWORE']
// testAnswers = ['AMISS', 'WORRY']

// testAnswers = ['SHOWY', 'FAUNA', 'FIERY', 'FUZZY', 'THUMP', 'DROLL', 'TAPER', 'BIBLE']

// const r = play({ answers: testAnswers, verbose: true, maxGuesses: 13 })
// console.log(r)
// run()

const testSolutions = _.sampleSize(wordList, 10)

let firstLetter = null
// for (soln of testSolutions) {
//   // if (soln[0] !== firstLetter) {
//   //   firstLetter = soln[0]
//   //   console.log(soln)
//   // }

//   console.log(soln)
//   const r = wordleSolve(soln)
//   if (!r.success) {
//     console.log('Failed to solve', soln)
//   }
// }

const testGuesses = [
  {
    word: 'LEGGY',
    key: '--GG-',
  },
]

const rWord = reconstituteWord(testGuesses)
const hitCount = getLetterHitCount(testGuesses[0])
// console.log(rWord)
// console.log(hitCount)

const o = { G: 2 }
const g = { B: 1, K: 1, E: 1 }
const y = { K: 3, E: 0 }

const combined = combineCounts([o, g, y])

// console.log(combined)

const t = wordHasAllKnownLetters('MONEY', 'NOMEY')
console.log(t)
