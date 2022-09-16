const utils = require('./node_utils')
const longWordList = require('./results/dordle-valid.json')
const shortWordList = require('./results/common-plus-official.json')
const _ = require('lodash')

const getUniformity = (array) => {
  return _.sumBy(array, (val) => val ** 2)
}

const getMaxUniformity = (wordList, numKeys) => {
  const results = []
  for (const word of wordList) {
    const bins = _.chain(utils.getBins(word, shortWordList, { returnObject: true }))
      .map((val, key) => {
        return {
          key,
          wordCount: val,
        }
      })
      .orderBy('wordCount', 'desc')
      .value()
    const u = getUniformity(bins.map((val) => val.wordCount).slice(0, numKeys))

    results.push({
      word,
      uniformity: u,
    })
  }

  const r = _.orderBy(results, 'uniformity', 'asc')[0]
  console.log(r)
  return r.word
}

const getWordsMatchingMostCommonKeys = (word, wordList, numKeys = 5) => {
  const bins = _.chain(utils.getBins(word, wordList, { returnObject: true, showMatches: true }))
    .map((val, key) => {
      return {
        key,
        matches: val,
        wordCount: val.length,
      }
    })
    .orderBy('wordCount', 'desc')
    .value()

  let matchBins = bins.slice(0, numKeys)
  // console.log(matchBins.slice(0, 5))

  let matches = _.flatten(matchBins.map((bin) => bin.matches))

  return matches
}

const makeGuessList = () => {
  let word = 'SANER'
  const guesses = [word]
  let matches = [...shortWordList]
  // let filtered = [...shortWordList]

  for (let i = 0; i < 3; i++) {
    matches = getWordsMatchingMostCommonKeys(word, matches, 10)

    word = getMaxUniformity(matches, 10)

    guesses.push(word)

    console.log(guesses)
    matches = matches
      .map((match) => {
        if (utils.guessesIdentifyAnswer(guesses, match, shortWordList)) {
          return match
        } else {
          return null
        }
      })
      .filter((match) => match !== null)
  }
  return guesses
}

const run = () => {
  let guessList
  guessList = makeGuessList()
  console.log(guessList)
  // const guessList = [ 'SANER', 'DIETS', 'LEAPT', 'RELIC' ]
  // guessList = [ 'DUCHY', 'SWAMP', 'BROKE', 'GLINT' ]

  // const result = utils.getPercentageIdentified(guessList, shortWordList)
  // console.log(result)
  // console.log(_.orderBy(bins, (a, b) => a, 'desc'))
}

if (require.main === module) {
  run()
}
