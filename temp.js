import { createEvaluator } from './src/utils'

const nytWords = require('./results/nyt-words.json')

const cargo = nytWords.indexOf('cargo')
console.log(cargo)

const word = nytWords[cargo + 1].toUpperCase()

const evaluator = createEvaluator(word)

const guess = ['ACRES', 'EMPTY', 'BULGE', 'KNIFE', 'OXIDE']

const response = evaluator(guess.slice(-1)[0])

console.log(response)
