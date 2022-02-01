const inquirer = require('inquirer')
const wordList = require('./results/words-common-7.json')
const { getBestChoice } = require('./analyze')
const { analysisFilter, getCanonicalKey, getBinsV2 } = require('./src/utils')
const _ = require('lodash')

const play = async () => {
  let c = true
  let filtered = wordList.slice()
  let suggestion
  let round = 1
  let bins

  while (c) {
    const answers = await inquirer.prompt([
      {
        name: 'guess',
        message: `Guessed word?`,
        default: suggestion ? suggestion : null,
      },
      {
        name: 'key',
        message: 'Wordle response?',
      },
    ])
    const guess = answers.guess.toLocaleUpperCase()
    const key = getCanonicalKey(answers.key)

    // if (round > 1) {
    //   bins = getBinsV2(guess, filtered, true, true)
    //   bins = _.map(bins, (value, key) => ({[key]: value}))
    //   bins = _.sortBy(bins, (value, key) => Object.values(value).length)
    //   console.log(bins)
    // }

    filtered = analysisFilter({ word: guess, key }, filtered)

    if (filtered.length === 1) {
      console.log(`The word is definitely ${filtered[0]}`)
      c = false
      continue
    }

    console.log(`There are ${filtered.length} words left.`)
    const best = await getBestChoice(filtered, 'most_unique')
    console.log(`Next good choice: ${best.word}`)
    suggestion = best.word

    // const keepGoing = await inquirer.prompt([
    //   {
    //     name: 'keep_going',
    //     type: 'confirm',
    //     message: 'Do we need to keep going?',
    //   },
    // ])
    // c = keepGoing.keep_going
    round++
  }
}

play().then(() => process.exit(0))
