const utils = require('./node_utils')
const wordList = require('./results/official-answers-alphabetical.json')
const _ = require('lodash')

const getAStarter = (binLimit = 10) => {
  let results = []
  for (const candidate of wordList) {
    // console.log(candidate)
    const bins = utils.getBins(candidate, wordList)
    const score = utils.wordsAtOrBelowLimit(binLimit)(bins)
    results.push({
      word: candidate,
      score,
    })

    // const answerList = utils.orderEntireWordList(wordList, {
    //   only_filtered: false,
    //   startingList: [candidate],
    // })
    // console.log(answerList.slice(0, 4))
  }
  results = _.orderBy(results, ['score'], ['desc'])
  console.log(results.slice(0, 25))
  return results
}

const calculateSolvability = (startingWord) => {
  // const startingWord = 'STARE'
  let bins = utils.getBins(startingWord, wordList, { returnObject: true, showMatches: true })
  bins = _.chain(bins)
    .map((value, key) => {
      return {
        key,
        words: value,
      }
    })
    .orderBy(['words.length'], ['asc'])
    .value()

  let accumulatedWords = []

  const analysis = bins.map((bin) => {
    const solution = utils.hasSolution(bin.words, wordList, { cheat: true })
    if (solution) {
      accumulatedWords = [...accumulatedWords, ...bin.words]
    }
    // const newBins = solution
    //   ? utils.getBins(solution, bin.words, { returnObject: true, showMatches: true })
    //   : null
    return {
      ...bin,
      solution,
      // newBins,
    }
  })

  // console.log(analysis)
  // console.log(accumulatedWords)
  console.log(startingWord, accumulatedWords.length)
  return {
    word: startingWord,
    solved_words: accumulatedWords.length,
    solvable_percentage: (accumulatedWords.length / wordList.length) * 100,
  }
}

const results = getAStarter(15)
console.log(results.slice(0, 10))

for (const starter of results) {
  const result = calculateSolvability(starter.word)
  console.log(result)
}

// calculateSolvability('STARE')
