import startingList from './results/common-plus-official.json'
import solutionsList from './results/official-answers-ordered-upper.json'
import _ from 'lodash'
import { evaluateToString, applyGuesses, getBins } from './src/utils'
import { weightKeys, wordsAtOrBelowLimit } from './src/scorers'

const orderByWeightedScores = (filteredLists) => {
  let results = {}
  filteredLists.forEach((filteredList) => {
    filteredList.forEach((word) => {
      const fullBins = getBins(word, filteredList, { returnObject: true })
      if (!results[word]) {
        results[word] = weightKeys(fullBins)
      } else {
        results[word] = results[word] + weightKeys(fullBins)
      }
    })
  })
  results = _.map(results, (r, k) => {
    return {
      word: k,
      score: r,
    }
  })
  return _.orderBy(results, (r) => r.score, 'desc')
}

const orderEntireWordList = (
  filteredList,
  { only_filtered = false, orderByWeight = false } = {},
) => {
  const maximizeUniqueness = wordsAtOrBelowLimit(1)
  if (filteredList.length > 400) return [{ word: _.sample(filteredList) }]

  let results
  // We always perform the analysis of `filteredList` because if a word is found
  // to solve with 100% probability, we can stop

  results = filteredList.map((word) => {
    const fullBins = getBins(word, filteredList, { returnObject: true })
    const bins = Object.values(fullBins)
    return {
      word,
      score: maximizeUniqueness(bins),
      weightedScore: weightKeys(fullBins) / (filteredList.length * 15),
    }
  })

  const filteredOrder = _.orderBy(results, (o) => o.score, 'desc')
  if (!(only_filtered || filteredOrder[0].score === filteredList.length)) {
    results = startingList.map((word) => {
      const fullBins = getBins(word, filteredList, { returnObject: true })
      const bins = Object.values(fullBins)
      return {
        word,
        score: maximizeUniqueness(bins),
        weightedScore: weightKeys(fullBins) / (filteredList.length * 15),
      }
    })
  }

  if (orderByWeight) {
    return _.orderBy(results, (o) => o.weightedScore, 'desc')
  }

  return _.orderBy(results, (o) => o.score, 'desc')
}

const evaluate = (guess, solutions) => {
  return solutions.map((solution) => {
    return {
      word: guess,
      key: evaluateToString(guess, solution),
    }
  })
}

const groupIsSolved = (group) => {
  const lastEntry = group.slice(-1)[0]
  return lastEntry && lastEntry.key === 'GGGGG'
}

const isSolved = (responseGroups) => {
  const solutionCheck = responseGroups.map((group) => {
    return groupIsSolved(group)
  })
  return _.every(solutionCheck)
}

const getNextGuess = (responseGroups) => {
  let nextGuess
  responseGroups = responseGroups.filter((group) => {
    return !groupIsSolved(group)
  })

  const filteredLists = responseGroups.map((guesses) => {
    return applyGuesses(startingList, guesses)
  })

  nextGuess = orderByWeightedScores(filteredLists)
  return nextGuess[0].word

  const useList = _.maxBy(filteredLists, (arr) => arr.length)
  // const useList = _.minBy(filteredLists, (arr) => arr.length)
  // console.log(useList[0])
  // const nextGuess = [{ word: _.sample(useList) }]
  // console.log(nextGuess)
  // nextGuess = orderEntireWordList(useList, { only_filtered: true, orderByWeight: true })
  // console.log(`next guess`, nextGuess)
  return nextGuess[0].word
}

const makeGuess = (guess, solutions, responses) => {
  const newResponses = _.cloneDeep(responses)
  const e = evaluate(guess, solutions)
  // console.log(e)
  e.forEach((guess, i) => {
    const checkIfSolved = newResponses[i].slice(-1)[0]
    if (checkIfSolved && checkIfSolved.key === 'GGGGG') {
      return
    }
    newResponses[i].push(guess)
  })
  // console.log(newResponses)
  return newResponses
}

const play = () => {
  const solutions = _.shuffle(solutionsList).slice(0, 4)
  // const solutions = ['CIVIC', 'BELTS']
  // console.log(solutions)
  let replies = solutions.map(() => {
    return []
  })

  let gameOver = false
  // let guesses = [_.sample(startingList)]
  let guesses = ['SPARE']
  let guess = guesses.slice(-1)[0]

  // replies = makeGuess(guess, solutions, replies)
  // guesses.push('PAINT')

  try {
    while (!gameOver && guesses.length < 15) {
      replies = makeGuess(guess, solutions, replies)
      if (isSolved(replies)) {
        gameOver = true
        console.log(`Solved ${solutions} in ${guesses.length} guesses`)
        return guesses.length
        return true
      }

      guesses.push(getNextGuess(replies))
      guess = guesses.slice(-1)[0]
    }
  } catch (e) {
    console.log('errored out')
    console.log(e)
    return false
  }
}

const trials = () => {
  const results = []
  let result
  Array(30)
    .fill(1)
    .forEach((x, i) => {
      const result = play()
      if (result) {
        results.push(result)
      }
    })
  console.log(results)
  console.log(`Average guesses: ${_.mean(results)}`)
}

trials()
// play()

const unitTests = () => {
  const solved = [
    [
      { word: 'STANK', key: 'YY-Y-' },
      { word: 'TENDS', key: 'YGG-G' },
      { word: 'STUCK', key: 'YY---' },
      { word: 'VENTS', key: '-GGGG' },
      { word: 'STICK', key: 'YY---' },
      { word: 'RENTS', key: 'GGGGG' },
    ],
    [
      { word: 'STANK', key: 'GG--G' },
      { word: 'TENDS', key: 'Y---Y' },
      { word: 'STUCK', key: 'GG-GG' },
      { word: 'VENTS', key: '---YY' },
      { word: 'STICK', key: 'GG-GG' },
      { word: 'RENTS', key: '---YY' },
      { word: 'STOCK', key: 'GGGGG' },
    ],
  ]
  const check = isSolved(solved)
  console.log(check)
}

// unitTests()
