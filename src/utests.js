import _, { every } from 'lodash'
import {
  createEvaluator,
  evaluateToString,
  filterWordsUsingGuessResult,
  getAnswersMatchingKey,
  getBins,
  getNextGuess,
  getPercentageIdentified,
  getPossibleKeys,
  getUniqueLetters,
  getUnusedLetters,
  getYellowLettersInGuesses,
  guessesIdentifyAnswer,
  isGuessableInOne,
  orderWordsByNewLetters,
} from './utils'

import db from '../db_connection'
import longWordList from '../results/dordle-valid.json'
import { sumRoots } from './scorers'
import utils from '../node_utils'
import wordList from '../results/official-answers.json'

const playTest = async (starting_word) => {
  const answer = _.sample(wordList)
  let guesses = [starting_word]
  let filtered = wordList.slice()
  let guess, key, best, bins

  while (guesses.slice(-1)[0] !== answer) {
    guess = guesses.slice(-1)[0]
    key = createEvaluator(answer)(guess)
    filtered = filterWordsUsingGuessResult({ word: guess, key }, filtered)

    console.log(filtered)
    for (const word of filtered) {
      console.log(word)
      let kd = getBins(word, filtered, { returnObject: true, showMatches: true })
      const efficient = getBins(word, filtered)
      bins = getBins(word, filtered)
      console.log('kd', kd)
      if (_.isEqual(bins, efficient)) {
        console.log('BINS OK')
      }
      return
    }
    return
  }

  console.log(_.last(guesses), answer)
}

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
      ordered = orderWordsByNewLetters(wordList, guessList)
      topUniqueLetters = ordered[0].count
      ordered = ordered.filter(({ count }) => count === topUniqueLetters)
      guessList = [...guessList, _.sample(ordered).word]
    }

    uniqueLetters = getUniqueLetters(guessList).length

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
    const potentialResult = utils.getPercentageIdentified([...guesses, nextGuess], unsolved)
    // console.log([...guesses, nextGuess], potentialResult)
    if (potentialResult.percentage > bestNextPct) {
      bestNextGuess = nextGuess
      bestNextPct = potentialResult.percentage
    }
  }

  console.log('new list', [...guesses, bestNextGuess])

  console.log(utils.getPercentageIdentified([...guesses, bestNextGuess], wordList))

  // const result = getPercentageIdentified(guesses, wordList)
  // console.log(result)
}

const testNewBins = async () => {
  const words = wordList.slice(50, 75)
  // console.log(words)
  for (const word of words) {
    // console.log(word)
    const dbWord = await db('words').select().where({ word }).first()
    const bins = getBins(word, wordList, true)
    const betterBins = getBins(word, wordList)

    // if (!_.isEqual(bins, betterBins)) {
    //   console.log('bins not equal')
    //   throw Error
    // }
    const root_score = sumRoots(betterBins)
    console.log(dbWord.word, dbWord.sqrt_score, root_score)
  }
}

if (require.main === module) {
  // getSomeStartingGuesses()
  // getStartingGuessesWithHighCoverage()
  run()
  // playTest('ROLES')
  // testNewBins().then(() => process.exit(0))
}
