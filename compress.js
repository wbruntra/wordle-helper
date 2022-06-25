import { decompress } from './src/utils'

const compress = (words) => {
  let s = words[0][0] + words[0].slice(1, 5).toLowerCase()
  // console.log(s)
  let prevWord = words[0]
  // let nextWord
  for (let w of words.slice(1)) {
    for (let i = 0; i < 5; i++) {
      if (prevWord[i] !== w[i]) {
        s = s + w[i] + w.slice(i + 1, 5).toLowerCase()
        prevWord = w
      }
    }
  }
  // console.log(s)
  return s
}

const commonPlusOfficial = require('./results/common-plus-official.json')
const nytAnswers = require('./results/nyt-words.json')
const nytValid = require('./results/nyt-valid-words.json')
const dordleValid = require('./results/dordle-valid.json')
// const s = compress(commonPlusOfficial)

let fullNyt = [...nytAnswers, ...nytValid].map((w) => w.toUpperCase()).sort()

const fs = require('fs')

const wordLists = {
  commonPlusOfficial: compress(commonPlusOfficial),
  nyt: compress(fullNyt),
  dordle: compress(dordleValid),
}

fs.writeFileSync('./compressed/wordLists.js', JSON.stringify(wordLists, null, 2))
// console.log(words)
// console.log(decompress(s))

// console.log(JSON.stringify(words) === JSON.stringify(decompress(s)))
