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

const getRemainingWords = (answer, guessList, wordList) => {
  const guesses = guessList.map((guess) => {
    return {
      word: guess,
      key: utils.evaluateToString(guess, answer),
    }
  })
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

const play = ({
  startingGuesses = ['DUCHY', 'FLINT', 'SWAMP', 'BROKE'],
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
    // console.log(remainingWords)
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

const r = play({ answers: testAnswers, verbose: true, maxGuesses: 11 })
console.log(r)
// run()
