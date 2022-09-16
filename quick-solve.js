const utils = require('./node_utils')
const wordList = require('./results/official-answers.json')

const run = () => {
  console.log(process.argv)
  let answer = process.argv[2].trim().toUpperCase()

  const guessList = ['STARE']
  let currentGuess = guessList[0]
  let guesses
  let filteredList = [...wordList]

  while (currentGuess !== answer) {
    guesses = guessList.map((guess) => {
      return {
        word: guess,
        key: utils.evaluateToString(guess, answer),
      }
    })
    filteredList = utils.applyGuesses(wordList, guesses)
    answerList = utils.orderEntireWordList(filteredList, {
      only_filtered: false,
      startingList: wordList,
    })
    currentGuess = answerList[0].word
    console.log(answerList.slice(0, 4))
    guessList.push(currentGuess)
  }
  console.log(guessList)
}

if (require.main === module) {
  run()
}
