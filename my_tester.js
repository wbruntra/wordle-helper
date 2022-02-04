import {
  analysisFilter,
  evaluateToString,
  isGuessableInOne,
  reclassifyAllForAnswer,
} from './src/utils'

import expandedList from './results/common-plus-official.json'
import wordList from './results/official-answers-ordered-upper.json'

let answers = wordList.slice(200, 230)
// answers = ['DOWDY']

const doubleCheck = (word, answer) => {
  // console.log(word, answer)
  const key = evaluateToString(word, answer)
  const filtered = analysisFilter(
    {
      word,
      key,
    },
    expandedList,
  )
  return filtered
}

for (const answer of answers) {
  const c = reclassifyAllForAnswer(answer, expandedList, { stop_after_one: true })
  console.log(c)

  // for (const response of c) {
  //   const checker = doubleCheck(response.word, answer)
  //   if (checker.length > 1) {
  //     throw Error('Check failed!')
  //   }
  // }
  // const guessable = isGuessableInOne(answer, expandedList)
  // guessable && console.log(`${answer} is guessable`)
  // if (!guessable) {
  //   console.log(`${word} is not guessable`)
  // }
  // result = result.filter((r) => r.words.length === 1)
}
console.log('DONE')
