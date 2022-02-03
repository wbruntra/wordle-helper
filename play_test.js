import { play, useFullListForAmazingHit } from './analyze'

import _ from 'lodash'
import fullList from './results/official-answers-ordered-upper.json'

const getSecondWord = (filtered, answer) => {
  const best = useFullListForAmazingHit(filtered, fullList, { verbose: true })
  if (best.word === answer) {
    return true
  }
  return best
}

const getThirdGuessWinProb = (filtered) => {
  return 1 / filtered
}

const simplePlay = async () => {
  const starting_word = 'CRANE'

  const answers = fullList.slice(50, 60)

  for (const answer of answers) {
  }
}

const run = async () => {
  const answers = fullList.slice(200, 202)
  console.log(answers.length)
  const starting_word = 'CRANE'
  const counter = {}
  const results = []

  for (const answer of answers) {
    const result = await play(starting_word, {
      method: 'easy_mode',
      chosen_answer: answer,
      binLimit: 1,
      verbose: false,
    })
    results.push(result.guesses)
  }
  console.log(results)
  for (const r of results) {
    if (Object.keys(counter).includes(r.toString())) {
      counter[r] = counter[r] + 1
    } else {
      counter[r] = 1
    }
  }
  _.forEach(counter, (value, key) => {
    console.log(`${key} : ${(100 * value) / results.length}%`)
  })
  // console.log(counter)
}

run()
