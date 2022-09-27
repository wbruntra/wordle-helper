import _, { each, every } from 'lodash'

import { evaluateToString } from './src/utils'
import fs from 'fs'
import wordList from './results/words-common-15.json'

const run = () => {
  const lts = '-GY'
  const answers = _.sampleSize(wordList, 800)
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

  fs.writeFileSync('./examples.json', JSON.stringify(results, null, 2))
  console.log(results)
}

run()
