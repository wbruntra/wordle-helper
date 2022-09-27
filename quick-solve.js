const utils = require('./node_utils')
const wordList = require('./results/official-answers.json')
const validWords = require('./results/nyt-valid-words-caps.json')
const _ = require('lodash')
const solutions = require('./solutions.json')
const fs = require('fs')

const solveIt = (
  answer,
  { startingWord = 'STARE', wordList = validWords, maxGuesses = 6, solveHard = false } = {},
) => {
  const guessList = [startingWord]
  let currentGuess = guessList[0]
  let guesses
  let filteredList = [...wordList]
  // let answerList

  while (guessList.length < maxGuesses && currentGuess !== answer) {
    guesses = guessList.map((guess) => {
      return {
        word: guess,
        key: utils.evaluateToString(guess, answer),
      }
    })

    filteredList = utils.applyGuesses(wordList, guesses)
    const limitToFiltered =
      solveHard || guessList.length < 2 || guessList.length + 1 === maxGuesses

    // console.log('fewGuesses', fewGuesses, 'guessLIst', guessList,'limit', limitToFiltered)

    if (guessList.length === 5) {
      console.log('filtered list', filteredList, limitToFiltered)
    }

    const answerList = utils.orderEntireWordList(filteredList, {
      only_filtered: limitToFiltered,
      startingList: validWords,
    })
    currentGuess = answerList[0].word
    // console.log(answerList.slice(0, 4))
    guessList.push(currentGuess)
  }
  return {
    success: currentGuess === answer,
    guessList,
  }
}

const run = () => {
  // console.log(process.argv)
  // let answer = process.argv[2].trim().toUpperCase()
  const startingWord = 'CRATE'
  let count = 0

  if (!solutions[startingWord]) {
    solutions[startingWord] = {}
  }

  const coveredWords = Object.keys(solutions[startingWord])

  const uncoveredWords = wordList.filter((word) => !coveredWords.includes(word))

  const answers = _.shuffle(uncoveredWords).slice(0, 400)
  for (const answer of answers) {
    const hardSolve = solveIt(answer, { solveHard: true, startingWord })
    if (hardSolve.success) {
      solutions[startingWord][answer] = hardSolve.success
      count++
    } else {
      console.log('hard solve failed', answer)
      const result = solveIt(answer, { solveHard: false, startingWord })
      solutions[startingWord][answer] = result.success
      if (result.success) {
        // console.log(`Success: ${answer} in ${result.guessList.length} guesses`)
        count++
      } else {
        console.log('Failed to solve', answer, result.guessList)
        solutions[startingWord][answer] = result.guessList
      }
    }
  }

  console.log(`solved ${count} out of ${answers.length}`)
  console.log(Object.keys(solutions[startingWord]).length)
  fs.writeFileSync('./solutions.json', JSON.stringify(solutions, null, 2))

  const testedWords = Object.keys(solutions)
  for (const tw of testedWords) {
    const solvedWords = Object.keys(solutions[tw]).filter((word) => solutions[tw][word] === true)
    console.log(`${tw}: ${solvedWords.length} out of ${Object.keys(solutions[tw]).length}`)
  }
}

run()
// if (require.main === module) {
// }
