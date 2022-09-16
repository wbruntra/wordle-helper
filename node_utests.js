const _ = require('lodash')
const db = require( './db_connection')
const longWordList = require('./results/dordle-valid.json')
const utils = require('./node_utils')
const wordList = require('./results/official-answers.json')

const getSomeStartingGuesses = (numGuesses = 4) => {
  let mostUniqueLetters = 0
  let bestList = []
  let i

  for (const startingWord of _.shuffle(wordList).slice(0, 300)) {
    let guessList = [startingWord]
    let ordered
    let uniqueLetters
    let topUniqueLetters

    while (guessList.length < numGuesses) {
      ordered = utils.orderWordsByNewLetters(wordList, guessList)
      topUniqueLetters = ordered[0].count
      ordered = ordered.filter(({ count }) => count === topUniqueLetters)
      guessList = [...guessList, _.sample(ordered).word]
    }

    uniqueLetters = utils.getUniqueLetters(guessList).length

    if (uniqueLetters > mostUniqueLetters) {
      mostUniqueLetters = uniqueLetters
      bestList = [...guessList]
    }
  }
  console.log(bestList)
  return bestList
}

const getStartingGuessesWithHighCoverage = () => {
  let guessArrays = Array(7)
    .fill(0)
    .map(() => {
      return getSomeStartingGuesses(3)
    })

  for (const guesses of guessArrays) {
    const result = getPercentageIdentified(guesses, wordList)
    console.log(guesses, result)
  }

  // console.log(guessArrays)
}

const run = () => {
  let guesses = []
  // guesses = ['BROKE', 'DUCHY', 'SWAMP', 'FLINT']
  // guesses = ['CLASH', 'WOMEN', 'FRITZ', 'PUDGY']
  guesses = ['STAND', 'PLUME', 'BIRCH']
  // const answer = 'LARVA'
  // const result = guessesIdentifyAnswer(guesses, answer, longWordList)

  const unsolved = wordList
    .map((answer) => {
      if (!utils.guessesIdentifyAnswer(guesses, answer, wordList)) {
        return answer
      }
      return false
    })
    .filter((a) => a)
  console.log(unsolved.slice(0, 25), unsolved.length)

  // const result = getPercentageIdentified(guesses, wordList)

  const ordered = utils.orderWordsByNewLetters(wordList, guesses)
  console.log(ordered.slice(0,10))

  let bestNextGuess
  let bestNextPct = 0

  for (const nextGuess of _.shuffle(wordList).slice(0, 100)) {
    // const potentialResult = utils.getPercentageIdentified([...guesses, nextGuess], unsolved)
    // console.log([...guesses, nextGuess], potentialResult)
    // if (potentialResult.percentage > bestNextPct) {
    //   bestNextGuess = nextGuess
    //   bestNextPct = potentialResult.percentage
    // }
  }

  console.log('new list', [...guesses, bestNextGuess])

  console.log(utils.getPercentageIdentified([...guesses, bestNextGuess], wordList))

  // const result = getPercentageIdentified(guesses, wordList)
  // console.log(result)
}

if (require.main === module) {
  // getSomeStartingGuesses()
  getStartingGuessesWithHighCoverage()
  // run()
  // playTest('ROLES')
  // testNewBins().then(() => process.exit(0))
}
