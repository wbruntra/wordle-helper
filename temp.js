const utils = require('./node_utils')

const nytWords = require('./results/nyt-words.json')
const solutionsAlphabetical = require('./results/official-answers-alphabetical.json')
const dordleValid = require('./results/dordle-valid.json')
const _ = require('lodash')
const fs = require('fs')

const getSomeStartingGuesses = (numGuesses = 4) => {
  let mostUniqueLetters = 0
  let bestList = []
  let i
  let rating

  const validStarters = dordleValid.filter((word) => {
    return utils.getUniqueLetters([word]).length === 5
  })

  for (const startingWord of _.shuffle(validStarters).slice(0, 300)) {
    let guessList = [startingWord]
    let ordered
    let uniqueLetters
    let topUniqueLetters

    while (guessList.length < numGuesses) {
      ordered = utils.orderWordsByNewLetters(dordleValid, guessList)
      topUniqueLetters = ordered[0].count
      ordered = ordered.filter(({ count }) => count === topUniqueLetters)
      guessList = [...guessList, _.sample(ordered).word]
    }

    uniqueLetters = utils.getUniqueLetters(guessList).length

    if (uniqueLetters >= mostUniqueLetters) {
      console.log(guessList, uniqueLetters)
      mostUniqueLetters = uniqueLetters
      bestList = [...guessList]
      if (uniqueLetters === 20) {
        rating = utils.getPercentageIdentified(guessList, solutionsAlphabetical, {
          estimate: true,
          // suggestNext: true,
          // returnNonIdentified: true,
        })
        console.log(rating)
      }
    }
  }
  console.log(bestList, utils.getUniqueLetters(bestList).length)
  return bestList
}

const identifyEverything = () => {
  let filteredList = [...dordleValid]
  let guesses = ['DUCHY', 'BROKE', 'GLINT', 'SWAMP', 'VALOR', 'FLAIR', 'TARGE', 'CACTI', 'PLEBE']
  guesses = [
    'DUCHY',
    'BROKE',
    'GLINT',
    'SWAMP',
    'VALOR',
    'FLAIR',
    'TARGE',
    'CACTI',
    'PLEBE',
    'LORDS',
    'MANES',
    'ANTAR',
    'JAKES',
  ]
  let percentResult
  while (filteredList.length > 0 && guesses.length < 20) {
    percentResult = utils.getPercentageIdentified(guesses, filteredList, {
      estimate: false,
      suggestNext: true,
      returnNonIdentified: true,
    })
    filteredList = [...percentResult.nonidentified]
    if (filteredList.length === 0) {
      break
    }
    guesses = [...guesses, percentResult.suggestNext]
    console.log(percentResult)
    console.log(guesses)
  }
  console.log('Final guesses:', guesses)
}

const run = () => {
  const startTime = Date.now()
  // const ranks = utils.rankCandidatesByPoints(solutionsAlphabetical)
  const t = {
    HAIRS: 25,
    HARMS: 35,
    HEART: 15,
  }

  const quordle = require('./raw/quordle.js')

  console.log(Object.keys(quordle))
  const quordleValid = quordle.allowed.split(' ')
  console.log(quordleValid.length, quordleValid.slice(0, 5))
  fs.writeFileSync('./results/quordle-valid.json', JSON.stringify(quordleValid, null, 2))

  const quordleSolutions = quordle.wordBank.split(' ')
  console.log(quordleSolutions.length, quordleSolutions.slice(0, 5))
  fs.writeFileSync('./results/quordle-solutions.json', JSON.stringify(quordleSolutions, null, 2))

  const allQuordle = [...quordleValid, ...quordleSolutions].sort()
  fs.writeFileSync('./results/quordle.json', JSON.stringify(allQuordle, null, 2))

  // const dordleValid = require('./results/dordle-valid.json')
  // console.log(dordleValid.length, dordleValid.slice(0, 5))



  // const results = _.map(t, (val, key)=> ({
  //   key,
  //   val,
  // }))
  // console.log(results)
  // const maxT = _.orderBy(results, 'val', 'desc')

  // console.log(maxT)
  // console.log(maxT[0].key)

  // getSomeStartingGuesses()

  // identifyEverything()
  // const guess = 'CRATE'
  // const answer = 'WRACK'
  // let results = []
  // for (const guess of solutionsAlphabetical) {
  //   const totalPoints = utils.evaluateAllForPoints(guess, solutionsAlphabetical)

  //   results.push({
  //     guess,
  //     points: totalPoints,
  //   })
  // }

  // results = _.orderBy(results, ['points'], ['desc'])
  // console.log(results.slice(0, 50))
  // const points = utils.evaluateForPoints(guess, answer)
  // console.log(ranks.slice(0, 20))
  console.log(`Time taken: ${((Date.now() - startTime) / 1000).toString().slice(0, 4)} seconds`)
}

run()

// const cargo = nytWords.indexOf('cargo')
// console.log(cargo)

// const word = nytWords[cargo + 1].toUpperCase()

// const evaluator = createEvaluator(word)

// const guess = ['ACRES', 'EMPTY', 'BULGE', 'KNIFE', 'OXIDE']

// const response = evaluator(guess.slice(-1)[0])

// console.log(response)
