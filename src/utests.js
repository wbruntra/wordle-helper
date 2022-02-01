import _, { every } from 'lodash'
import {
  analysisFilter,
  createEvaluator,
  evaluateToString,
  filterWords,
  filterWordsWithAnswer,
  getAllKeys,
  getAnswersMatchingKey,
  getBins,
  getBinsEfficiently,
  getBinsV2,
  getEliminatedCount,
  getEliminatedCountWithAnswer,
  getKeyDictionary,
  getPossibleKeys,
} from './utils'

import db from '../db_connection'
import { sumRoots } from '../scorers'
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
      let kd = getKeyDictionary(word, filtered)
      const efficient = getBinsEfficiently(word, filtered)
      bins = getBins(word, filtered)
      if (_.isEqual(bins, efficient)) {
        console.log('BINS OK')
      }
      return
      kd = _.orderBy(kd, (o) => Object.values(o)[0], 'desc')
      // console.log(kd)
      const kdKeys = kd.map((o) => Object.keys(o)[0]).sort()
      if (!_.isEqual(kdKeys, getPossibleKeys(word, filtered))) {
        throw Error('SOMETHING VERY BAD!')
      }
      // console.log(kdKeys)
      // console.log(getPossibleKeys(word, filtered))
      // console.log(kd)

      // console.log(bins)
      // console.log(sumRoots(bins), bins.length)
    }
    return

    best = _.sample(filtered)
    guesses.push(best)
  }

  console.log(_.last(guesses), answer)
  // if (_.sum(bins) !== wordList.length) {
  //   const kd = getKeyDictionary(word, wordList)
  //   console.log(kd)
  //   throw Error('BINS NOT OK')
  // }
}

const run = () => {
  const word = 'CHIME'
  const bins = getBinsV2(word, wordList, true)
  // console.log(bins)
  const sortBins = _.chain(bins)
    .map((value, key) => {
      return [key, value]
    })
    .sortBy((item) => item[1])
    .reverse()
    .value()

  console.log(sortBins)

  // if (_.sum(bins) === wordList.length) {
  //   console.log('BINS OK')
  // }

  // let kd = getBin(word, wordList)
  // console.log(kd)
  // kd = _.orderBy(kd, (o) => Object.values(o)[0], 'desc')
}

const testNewBins = async () => {
  const words = wordList.slice(50, 75)
  // console.log(words)
  for (const word of words) {
    // console.log(word)
    const dbWord = await db('words').select().where({ word }).first()
    const bins = getBinsEfficiently(word, wordList, true)
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
// testNewBins().then(() => process.exit(0))
// playTest('ROLES')
