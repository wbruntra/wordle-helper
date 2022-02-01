import _ from 'lodash'
import { getBinsV2 } from './src/utils'
import { smallBins } from './scorers'
import wordList from './results/official-answers.json'

const meetsTest = (word) => {
  const vowels = 'AEIOU'
  const consonants = 'BCDGFHMPW'

  if (_.uniq(word.split('')).length !== word.length) {
    return false
  }

  const hasVowels = word
    .split('')
    .map((c) => vowels.includes(c))
    .filter((v) => v).length
  const hasConsonants = word
    .split('')
    .map((c) => consonants.includes(c))
    .filter((v) => v).length

  if (hasVowels == 2 && hasConsonants == 3) {
    return true
  }
  return false
}

const smallBinTest = smallBins(3)

let goodWords = wordList.map((word) => {
  const bins = getBinsV2(word, wordList)
  const score = smallBinTest(bins)
  return [word, score]
})

goodWords = _.sortBy(goodWords, (item) => item[1]).reverse()

console.log(goodWords.map((gw)=> gw[0]).slice(0, 15))
