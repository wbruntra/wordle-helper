import _, { every } from 'lodash'
import {
  analysisFilter,
  createEvaluator,
  evaluateToString,
  getAllKeys,
  getAnswersMatchingKey,
  getBinsV2,
  getPossibleKeys,
} from './utils'

import db from '../db_connection'
import { sumRoots } from './scorers'
import wordList from '../results/official-answers.json'

const playTest = async (starting_word) => {
  const answer = _.sample(wordList)
  let guesses = [starting_word]
  let filtered = wordList.slice()
  let guess, key, best, bins

  while (guesses.slice(-1)[0] !== answer) {
    guess = guesses.slice(-1)[0]
    key = createEvaluator(answer)(guess)
    filtered = analysisFilter({ word: guess, key }, filtered)

    console.log(filtered)
    for (const word of filtered) {
      console.log(word)
      let kd = getBinsV2(word, filtered, { dictionary: true, showMatches: true })
      const efficient = getBinsV2(word, filtered)
      bins = getBinsV2(word, filtered)
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

const run = () => {
  const word = 'CHIME'
  const bins = getBinsV2(word, wordList, true)
  const sortBins = _.chain(bins)
    .map((value, key) => {
      return [key, value]
    })
    .sortBy((item) => item[1])
    .reverse()
    .value()

  console.log(sortBins)
}

const testNewBins = async () => {
  const words = wordList.slice(50, 75)
  // console.log(words)
  for (const word of words) {
    // console.log(word)
    const dbWord = await db('words').select().where({ word }).first()
    const bins = getBinsV2(word, wordList, true)
    const betterBins = getBinsV2(word, wordList)

    // if (!_.isEqual(bins, betterBins)) {
    //   console.log('bins not equal')
    //   throw Error
    // }
    const root_score = sumRoots(betterBins)
    console.log(dbWord.word, dbWord.sqrt_score, root_score)
  }
}

run()
playTest('ROLES')
testNewBins().then(() => process.exit(0))
