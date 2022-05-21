import {
  filterWordsUsingGuessResult,
  evaluateToString,
  getBestChoice,
  getBestHitFromFullList,
  getBins,
  getCanonicalKey,
} from './src/utils'

import _ from 'lodash'
import inquirer from 'inquirer'
// import wordList from './results/official-answers.json'
import wordList from './results/common-plus-official.json'
import { wordsAtOrBelowLimit } from './src/scorers'

const orderEntireWordList = (filteredList, startingList, { only_filtered = false } = {}) => {
  const unique_scorer = wordsAtOrBelowLimit(1)

  const filteredResults = filteredList.map((word) => {
    const bins = getBins(word, filteredList)
    return {
      word,
      score: unique_scorer(bins),
    }
  })
  const filteredOrder = _.orderBy(filteredResults, (o) => o.score, 'desc')
  if (only_filtered || filteredOrder[0].score === filteredList.length) {
    return filteredOrder
  }

  let results = startingList.map((word) => {
    const bins = getBins(word, filteredList)
    return {
      word,
      score: unique_scorer(bins),
    }
  })

  results = _.orderBy(results, (o) => o.score, 'desc')
  return results
}

const play = async () => {
  let c = true
  let filtered = wordList.slice()
  let suggestion
  let round = 1
  let nextWord

  const questions = [
    {
      name: 'key',
      message: 'Wordle response',
    },
  ]
  if (!nextWord) {
    questions.unshift({
      name: 'answer',
      message: `Correct answer?`,
    })
  }

  const answers = await inquirer.prompt(questions)

  console.log(answers)

  const answer = answers.answer.toLocaleUpperCase()
  const inputKey = getCanonicalKey(answers.key)

  const matches = filtered
    .map((w) => {
      if (evaluateToString(w, answer) == inputKey) {
        return w
      }
    })
    .filter((w) => w)
  console.log(matches)

  // const bins = getBins(answer, filtered, { returnObject: true, showMatches: true })

  // const bin = _.find(bins, (val, key) => {
  //   return key === inputKey
  // })

  // console.log(bin)

  // filtered = filterWordsUsingGuessResult({ word: answer, key }, filtered)
}

play().then(() => process.exit(0))
