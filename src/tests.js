import { getEval, filterWords, evaluate, stringEval } from './utils'
import starterList from './starterList.json'

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
  if (guesses[0] === answer) {
    return guesses
  }
  let e
  let guess
  while (true) {
    guess = guesses[guesses.length - 1]
    if (guess === answer) {
      return guesses
    }
    if (!guess) {
      console.log(guesses)
      console.log(e)
      return filtered
    }
    e = evaluate(guess, answer)
    filtered = filterWords(guess, e, filtered)
    guesses.push(getGuess(filtered))
    if (guesses.length > 30) {
      return 'FAIL', guesses
    }
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

run()
// testCases()
