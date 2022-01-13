import masterWords from './words.json'
import starterList from './starterList.json'
// const starterList = masterWords.filter((word) => {
//   return word.length === 5
// })

export const containFilter = (words, letters, reverse = false) => {
  let filtered = words.slice()
  for (let c of letters) {
    filtered = filtered.filter((word) => {
      const test = word.includes(c)
      if (reverse) {
        return !test
      }
      return test
    })
  }
  return filtered
}

export const locationFilter = (words, correctLetters) => {
  // correctLetter = {
  //   position: 2,
  //   name: 'B'
  // }

  let filtered = words.slice()
  for (let letter of correctLetters) {
    filtered = filtered.filter((word) => {
      const test = word[letter.position] === letter.name
    })
  }
}

export const isCorrect = (guess, answer) => {
  return guess === answer
}

export const stringEval = (guess, answer) => {
  let result = ''

  const e = evaluate(guess, answer)

  result = e.map((item, i) => {
    if (item.exact) {
      return 'G'
    }
    if (!item.exact && item.present) {
      return 'Y'
    }
    return '-'
  })
  return result.join('')
}

export const evaluate = (guess, answer) => {
  if (!guess) {
    console.log(guess, answer)
  }
  let remainingAnswer = answer.slice()
  const result = []
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = {
        exact: true,
        name: guess[i],
      }
      remainingAnswer = remainingAnswer.replace(guess[i], '-')
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (result[i]) {
      continue
    }
    if (remainingAnswer.includes(guess[i])) {
      result[i] = {
        exact: false,
        present: true,
        name: guess[i],
      }
      remainingAnswer = remainingAnswer.replace(guess[i], '-')
    } else {
      result[i] = {
        exact: false,
        present: false,
        name: guess[i],
      }
    }
  }
  return result
}

const getCorrect = (evaluation) => {
  let result = ''
  for (let i = 0; i < evaluation.length; i++) {
    if (evaluation[i].exact) {
      result = result + evaluation[i].name
    } else {
      result = result + '-'
    }
  }
  return result
}

const getPresent = (evaluation) => {
  let result = ''
  for (let i = 0; i < evaluation.length; i++) {
    if (!evaluation[i].exact && evaluation[i].present) {
      result = result + evaluation[i].name
    } else {
      result = result + '-'
    }
  }
  return result
}

const getAbsent = (guess, correct, present) => {
  let result = guess.slice()
  const evals = correct + present
  for (let c of evals) {
    if (c !== '-') {
      result = result.replace(c, '')
    }
  }
  return result
}

const testWord = (word, correct, present, absent) => {
  let remains = word.slice()
  let i
  for (i = 0; i < correct.length; i++) {
    if (correct[i] !== '-' && correct[i] !== remains[i]) {
      return false
    } else {
      if (correct[i] !== '-') {
        remains = remains.slice(0, i) + '-' + remains.slice(i + 1)
      }
    }
  }
  for (i = 0; i < present.length; i++) {
    if (present[i] !== '-' && (!remains.includes(present[i]) || remains[i] === present[i])) {
      return false
    } else {
      remains = remains.replace(present[i], '-')
    }
  }
  for (i = 0; i < absent.length; i++) {
    if (remains.includes(absent[i])) {
      return false
    }
    remains = remains.replace(present[i], '-')
  }
  return true
}

export const filterWords = (guess, evaluation, words) => {
  const correct = getCorrect(evaluation)
  const present = getPresent(evaluation)
  const absent = getAbsent(guess, correct, present)
  // console.log(absent)
  const filtered = words.filter((word) => {
    return testWord(word, correct, present, absent)
  })
  return filtered
}

const removeCorrect = (evaluation, word) => {
  let result = ''
  const correct = getCorrect(evaluation)
  for (let i = 0; i < correct.length; i++) {
    if (correct[i] !== '-') {
      result = result + word[i]
    } else {
      result = result = '-'
    }
  }
  return result
}

const filterUsingEvaluation = (evaluation, words) => {
  const filtered = words.filter((word) => {
    let remains = word.slice()
    let result = true
    for (let i = 0; i < evaluation.length; i++) {
      let c = evaluation[i]
      if (c.correct && word[i] !== c.name) {
        return false
      } else {
      }
    }
    return result
  })
}

export const getEval = (guess) => {
  const result = []
  const word = guess.word
  const key = guess.key
  for (let i = 0; i < word.length; i++) {
    if (key[i] === '+' || key[i] === 'G') {
      result.push({
        exact: true,
        name: word[i],
      })
    } else if (key[i] === 'Y') {
      result.push({
        exact: false,
        present: true,
        name: word[i],
      })
    } else {
      result.push({
        exact: false,
        present: false,
        name: word[i],
      })
    }
  }
  return result
}

const run = () => {
  // const answer = 'FAVOR'
  // const guess = 'FAKIR'
  // const doesntContain = getContainedLetters(e, true)
  // const contains = getContainedLetters(e, false)
  // const correct = getCorrect(e)
  // const present = getPresent(e)
  // const absent = getAbsent(guess, correct, present)
  // console.log(e)
  let e
  let filtered = starterList
  let guesses = ['SLANT', 'CARED', 'FAKIR']
  guesses = ['WHERE', 'HEART', 'BOARS', 'POLAR', 'MANOR']
  guesses = [
    {
      word: 'FUNNY',
      key: '-----',
    },
    {
      word: 'ABACI',
      key: '----P',
    },
    {
      word: 'DEIST',
      key: '-PPP-',
    },
    {
      word: 'GIVES',
      key: 'P+-PP',
    },
  ]
  for (let guess of guesses) {
    // e = evaluate(guess, answer)
    e = getEval(guess)
    console.log(e)
    filtered = filterWords(guess.word, e, filtered)
  }

  // let filtered = filterWords(guess, e, starterList)

  console.log(filtered.slice(0, 5))
  // console.log(correct, present, absent)
}
// if (module.)
// run()
