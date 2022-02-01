import _, { every } from 'lodash'
import {
  analysisFilter,
  createEvaluator,
  evaluateToString,
  filterWords,
  filterWordsWithAnswer,
  getAnswersMatchingKey,
  getEliminatedCount,
  getEliminatedCountWithAnswer
} from './utils'

import fs from 'fs'
// import starterList from './starterList.json'
import starterList from '../results/words-common-15.json'

// import resultList from './result-list.json'
// import oldTestResults from './test-results.json'

const sleep = (ms) => {
  const time = ms / 1000
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const numToKey = (n) => {
  const s = ('00000' + n.toString(3)).slice(-5)
  return s.split('').map((i) => {
    switch (i) {
      case '0':
        return '-'
      case '1':
        return 'Y'
      case '2':
        return 'G'
    }
  }).join('')
}

const getWordCountForKey = (word, key, wordList) => {
  const answers = getAnswersMatchingKey(word, key, wordList)
  if (answers.length === 0) {
    return 0
  }
  // console.log(answers.slice(0, 10))
  return answers.length
}

const evaluateWord = (word) => {
  const result = {}
  let count
  for (let i=0;i<=242;i++) {
    const key = numToKey(i)
    count = getWordCountForKey(word, key, starterList)
    if (count > 0) {
      result[key] = count
    }
  }
  console.log(result)
  return result
}

const testCases = () => {
  const cases = [
    {
      answer: 'ABCDE',
      guess: 'ZYXWV',
      e: '-----',
    },
    {
      answer: 'AACDE',
      guess: 'ABAZY',
      e: 'G-Y--',
    },
    {
      answer: 'MOMMA',
      guess: 'MMOXX',
      e: 'GYY--',
    },
    {
      answer: 'SALTY',
      guess: 'LASTS',
      e: 'YGYG-',
    },
    {
      answer: 'STOPS',
      guess: 'GLASS',
      e: '---YG',
    },
    {
      answer: 'SOPSS',
      guess: 'SOOPS',
      e: 'GG-YG',
    },
  ]
  const testResult = cases.map((c) => {
    // const e = evaluateToString(c.guess, c.answer)
    const e = createEvaluator(c.answer)(c.guess)
    return e === c.e
  })
  if (every(testResult)) {
    console.log('EVAL OK')
  } else {
    console.log('EVAL FAIL')
  }
}

const answers = ['ASIDE', 'WEARY', 'PLUCK', 'BRAKE', 'ABBEY']

const getGuess = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

class Counter {
  constructor() {
    this.counter = {}
  }

  count(k) {
    // console.log(Object.keys(this.counter))
    if (this.counter[k]) {
      this.counter[k] = this.counter[k] + 1
    } else {
      //   console.log(`init ${k}`)
      this.counter[k] = 1
    }
  }
}

const solver = (answer) => {
  let filtered = starterList.slice()
  const guesses = [_.sample(starterList)]
  let e
  let guess
  let stringEval
  while (true) {
    guess = guesses[guesses.length - 1]
    if (guess === answer) {
      return guesses
    }
    stringEval = evaluateToString(guess, answer)
    filtered = filterWords({ word: guess, key: stringEval }, filtered)
    // filtered = analysisFilter({ word: guess, key: stringEval}, filtered)
    guesses.push(getGuess(filtered))

    // IF THERE IS A BUG do not run forever
    if (guesses.length > 30) {
      return 'FAIL', guesses
    }
  }
}

const testSolver = () => {
  let flag = 0
  const results = answers.map((answer) => {
    const a = solver(answer)
    // const a = newSolver(answer)
    return a[a.length - 1] === answer
  })
  if (every(results)) {
    console.log('SOLVER OK')
  } else {
    console.log('SOLVER FAIL')
  }
}

const run = () => {
  let tries = 0
  // const answer = answers.slice().pop()
  // console.log(answer)
  const c = new Counter()
  //   const guesses = ['SIZER', 'SHIES', 'EXIST', 'SWIPE', 'NOISE']
  //   const filtered = starterList.slice()
  for (const answer of answers) {
    for (let i = 0; i < 100; i++) {
      const a = solver(answer)
      c.count(a.length)
      tries++
    }
  }
  for (const k of Object.keys(c.counter)) {
    console.log(k, c.counter[k] / tries)
  }
}

const getAverageEliminated = (guess, answers) => {
  const results = []
  for (const answer of answers) {
    const eliminatedCount = getEliminatedCount(guess, answer, starterList)
    results.push(eliminatedCount)
  }
  const avg = _.mean(results)
  return avg
}

const newGetAverageEliminated = (guess, answers) => {
  const results = []
  for (const answer of answers) {
    const key = evaluateToString(guess, answer)
    const eliminatedCount = getEliminatedCountWithAnswer(key, answer, starterList)
    results.push(eliminatedCount)
  }
  const avg = _.mean(results)
  return avg
}

const judgeGuesses = (testResults) => {
  const newResults = {}

  const guessSampleSize = 60
  const answerSampleSize = 180

  const wordsRemaining = starterList.filter((word) => {
    return !Object.keys(testResults).includes(word)
  })
  console.log(`words remaining: ${wordsRemaining.length}`)

  const guesses = _.sampleSize(wordsRemaining, guessSampleSize)
  const answers = _.sampleSize(starterList, answerSampleSize)

  for (const guess of guesses) {
    console.log(guess)
    // newResults[guess] = newGetAverageEliminated(guess, answers)
    newResults[guess] = getAverageEliminated(guess, answers)
  }

  // console.log(newResults)

  const result = {
    ...testResults,
    ...newResults,
  }

  const ordered = orderResults(result)

  saveResults(ordered, './new-result-list.json')
}

const testEliminator = () => {
  console.log(answers)
  const answer = answers.slice().pop()
  console.log(answer)
  const guess = 'RAISE'
  const eliminatedCount = getEliminatedCount(guess, answer, starterList)
  console.log(eliminatedCount)
}

const orderResults = (results) => {
  const ordered = _.chain(results)
    .map((val, key) => {
      return {
        word: key,
        avg: val,
      }
    })
    .orderBy((o) => o.avg, 'desc')
    .value()
  return ordered
}

const resultsToObject = (results) => {
  return _.reduce(
    results,
    (result, value, key) => {
      result[value.word] = value.avg
      return result
    },
    {},
  )
}

const saveResults = (results, filename) => {
  // const ordered = orderResults(results)
  fs.writeFileSync(filename, JSON.stringify(results, null, 2))
}


// const testResults = resultsToObject(resultList)

// run()
// testCases()
// testSolver()
// testEliminator()
// getAverageEliminated('RAISE', starterList)
const testResults = require('./new-result-list.json')
const reconst = resultsToObject(testResults)

// judgeGuesses(reconst)

// saveResults(testResults, './result-list.json')
// const ordered = orderResults(oldTestResults)
// console.log(ordered)

// const reconst = resultsToObject(ordered)
// console.log(reconst)

if (require.main === module) {
  const start = new Date()

  // evaluateWord('FUZZY')

  // testCases()
  testSolver()

  console.log(`Total time: ${(new Date() - start) / 1000} seconds`)  
}

