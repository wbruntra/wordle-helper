// const inquirer = require('inquirer')
// const wordList = require('./results/words-common-7.json')
// const wordList = require('./results/official-answers.json')
// const { getBestChoice, useFullListForAmazingHit } = require('./analyze')
// const { analysisFilter, getCanonicalKey, getBinsV2 } = require('./src/utils')
// const _ = require('lodash')

import { analysisFilter, getBestChoice, getBestHitFromFullList, getCanonicalKey } from './src/utils'

import _ from 'lodash'
import inquirer from 'inquirer'
import wordList from './results/official-answers.json'

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
    if (filtered.length < 10) {
      console.log(filtered)
    }

    const fullyBest = getBestHitFromFullList(filtered, wordList, { verbose: true, limit: 1 })
    const best = await getBestChoice(filtered, { scoring_method: 'most_in_bins' })
    console.log(`Best choice from list: ${best.word}`)
    console.log(`Best overall choice (${fullyBest.score} unique keys): ${fullyBest.word}`)
    suggestion = best.word

    const nextGuess = await inquirer.prompt([
      {
        type: 'list',
        name: 'word',
        message: 'Which is your next word?',
        choices: [best.word, fullyBest.word, 'other'],
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
