import {
  getEval,
  filterWords,
  evaluate,
  stringEval,
  getEliminatedCount,
  newEval,
  newFilter,
  isWordValid,
  newGetEliminatedCount,
} from './utils'
import starterList from './starterList.json'
import _ from 'lodash'
import fs from 'fs'
import testResults from './test-results.json'

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
  cases.forEach((c) => {
    const s = stringEval(c.guess, c.answer)
    console.log(s, c.e, s === c.e)
  })
}

const answers = ['PICKY', 'ASIDE', 'WEARY', 'GRIPE', 'PLUCK', 'CHAMP', 'BRAKE', 'ABBEY']

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
  const guesses = [getGuess(filtered)]
  let e
  let guess
  while (true) {
    guess = guesses[guesses.length - 1]
    if (guess === answer) {
      return guesses
    }
    e = evaluate(guess, answer)
    filtered = filterWords(guess, e, filtered)
    guesses.push(getGuess(filtered))

    // IF THERE IS A BUG do not run forever
    if (guesses.length > 30) {
      return 'FAIL', guesses
    }
  }
}

const newSolver = (answer) => {
  let filtered = starterList.slice()
  const guesses = [getGuess(filtered)]
  let e
  let guess
  while (true) {
    guess = guesses[guesses.length - 1]
    if (guess === answer) {
      return guesses
    }
    e = newEval(answer, guess)
    filtered = newFilter({ word: guess, key: e }, filtered)
    guesses.push(getGuess(filtered))

    // IF THERE IS A BUG do not run forever
    if (guesses.length > 30) {
      return 'FAIL', guesses
    }
  }
}

const testSolver = () => {
  let flag = 0
  for (const answer of answers) {
    // const a = solver(answer)
    const a = newSolver(answer)
    if (a[a.length - 1] !== answer) {
      console.log('Solver is broken!')
      console.log(a[a.length - 1], answer)
      flag = 1
    } else {
      console.log(answer, a[a.length - 1])
    }
  }
  if (flag === 0) {
    console.log('TESTS OK')
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
    const eliminatedCount = getEliminatedCount(guess, answer, starterList.slice())
    results.push(eliminatedCount)
  }
  // console.log(results)
  const avg = _.mean(results)
  // console.log(avg)
  return avg
}

const newGetAverageEliminated = (guess, answers) => {
  const results = []
  for (const answer of answers) {
    const eliminatedCount = newGetEliminatedCount(guess, answer, starterList)
    results.push(eliminatedCount)
  }
  // console.log(results)
  const avg = _.mean(results)
  // console.log(avg)
  return avg
}

const judgeGuesses = (useNew = true) => {
  const result = {
    ...testResults,
  }
  // const result = {}
  const guessSampleSize = 10
  const answerSampleSize = 250

  const guesses = _.sampleSize(starterList, guessSampleSize).filter((word) => {
    return !Object.keys(result).includes(word)
  })
  if (guesses.length < guessSampleSize) {
    console.log('filter worked', guesses.length)
  }

  const answers = _.sampleSize(starterList, answerSampleSize)

  for (const guess of guesses) {
    if (useNew) {
      result[guess] = newGetAverageEliminated(guess, answers)
    } else {
      result[guess] = getAverageEliminated(guess, answers)
    }
  }

  const ranks = _.orderBy(
    _.map(result, (v, k) => {
      return {
        word: k,
        result: v,
      }
    }),
    ['result'],
    ['desc'],
  )

  // const ranks = _.sortBy(result, (v, k) => v)
  // console.log(result)

  fs.writeFileSync('./test-results.json', JSON.stringify(result, null, 2))

  console.log(ranks.slice(0, 20))
}

const testEliminator = () => {
  const answer = answers.slice().pop()
  console.log(answer)
  const guess = 'RAISE'
  const eliminatedCount = getEliminatedCount(guess, answer, starterList.slice())
  console.log(eliminatedCount)
}

// run()
// testCases()
// testSolver()
// testEliminator()
// getAverageEliminated('RAISE')
judgeGuesses()
