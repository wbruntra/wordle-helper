import _, { each, every } from 'lodash'
import { evaluateToString, getAllKeys } from './src/utils'

import wordList from './results/words-common-15.json'

const run = () => {
  const lts = '-GY'
  const answers = _.sampleSize(wordList, 400)
  const results = answers
    .map((answer) => {
      const guess = _.sample(wordList)
      const key = evaluateToString(guess, answer)
      if (
        every(
          lts.split('').map((l) => {
            return key.includes(l)
          }),
        )
      ) {
        return {
          word: guess,
          key,
        }
      }
    })
    .filter((a) => a)
  console.log(results)
}

run()