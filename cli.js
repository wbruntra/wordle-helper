// const inquirer = require('inquirer')
// const wordList = require('./results/words-common-7.json')
// const wordList = require('./results/official-answers.json')
// const { getBestChoice, useFullListForAmazingHit } = require('./analyze')
// const { analysisFilter, getCanonicalKey, getBinsV2 } = require('./src/utils')
// const _ = require('lodash')

import {
  analysisFilter,
  getBestChoice,
  getBestHitFromFullList,
  getBinsV2,
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
    const bins = getBinsV2(word, filteredList)
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
    const bins = getBinsV2(word, filteredList)
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
  let bins
  let nextWord

  while (c) {
    const questions = [
      {
        name: 'key',
        message: 'Wordle response?',
      },
    ]
    if (!nextWord) {
      questions.unshift({
        name: 'guess',
        message: `Guessed word?`,
      })
    }

    const answers = await inquirer.prompt(questions)

    const guess = nextWord ? nextWord.toLocaleUpperCase() : answers.guess.toLocaleUpperCase()
    const key = getCanonicalKey(answers.key)

    filtered = analysisFilter({ word: guess, key }, filtered)

    if (filtered.length === 1) {
      console.log(`The word is definitely ${filtered[0]}`)
      c = false
      return
    }

    console.log(`There are ${filtered.length} words left.`)

    const ordered = orderEntireWordList(filtered, wordList, { only_filtered: false })

    const fullyBest = getBestHitFromFullList(filtered, wordList, { verbose: false, limit: 1 })
    const best = await getBestChoice(filtered, wordList, { scoring_method: 'most_in_bins' })
    console.log(
      `Best choice from list: ${best.word}, with a ${(
        (100 * best.score) /
        filtered.length
      ).toFixed(1)}% chance of solving`,
    )
    console.log(
      `Best overall choice (${((100 * fullyBest.score) / filtered.length).toFixed(
        1,
      )}% chance of solving): ${fullyBest.word}`,
    )
    suggestion = best.word

    const nextGuess = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'word',
        message: 'Which is your next word?',
        choices: [best.word, ...ordered.slice(0, 3).map((o) => o.word), 'other'],
        default: 0,
      },
    ])

    if (nextGuess.word === 'other') {
      const guessedWord = await inquirer.prompt([
        {
          name: 'guess',
          message: `Guessed word?`,
        },
      ])
      nextWord = guessedWord.word
    } else {
      nextWord = nextGuess.word
    }

    round++
  }
}

play().then(() => process.exit(0))
