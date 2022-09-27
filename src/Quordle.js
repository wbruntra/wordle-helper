import _, { add } from 'lodash'
import {
  applyGuesses,
  evaluateToString,
  filterWordsUsingGuessResult,
  getBins,
  getCanonical,
  getCanonicalKey,
  getGuessesWithKeys,
} from './utils'
import { useEffect, useRef, useState } from 'react'
import { weightKeys, wordsAtOrBelowLimit } from './scorers'

import DisplayStatus from './DisplayStatus'
import Guess from './Guess'
import ReactTooltip from 'react-tooltip'
import examples from './examples.json'
import produce from 'immer'
import quordleSolver from './quordleSolver'
import { nytAll as starterList } from './wordlists/index'

function Quordle() {
  const gameOptions = {
    wordle: { label: 'Wordle', value: 'wordle', length: 1 },
    dordle: { label: 'Dordle', value: 'dordle', length: 2 },
    // trordle: { label: 'Trordle', value: 'trordle', length: 3 },
    quordle: { label: 'Quordle', value: 'quordle', length: 4 },
  }

  const [gameType, setGameType] = useState(gameOptions.quordle)

  const [guesses, setGuesses] = useState([])
  const [guess, setGuess] = useState('')
  const [evaluations, setEvaluations] = useState(Array(4).fill({}))

  const [answerInput, setAnswerInput] = useState('')
  const [answers, setAnswers] = useState([])

  const handleAnswers = () => {
    const newAnswers = answerInput
      .toUpperCase()
      .split(',')
      .map((a) => a.trim())

    setAnswers(newAnswers)
  }

  useEffect(() => {
    if (_.isEmpty(answers)) {
      return
    }
    if (answers.every((answer) => answer.length === 5)) {
      setGameType({
        label: 'Solved',
        value: 'solved',
        length: answers.length,
      })
      const result = quordleSolver({
        answers,
        verbose: true,
      })

      console.log(result)
      const guesses = result.guessList
      setGuesses(guesses)

      const newEvaluations = answers.map((answer) => {
        const guessesPlusKeys = getGuessesWithKeys(guesses, answer)
        console.log('guessesPlusKeys', guessesPlusKeys)
        const result = guessesPlusKeys.reduce((acc, item) => {
          acc[item.word] = item.key
          return acc
        }, {})
        return result
      })
      console.log('new evaluations')
      console.log(newEvaluations)
      setEvaluations(newEvaluations)
    }
  }, [answers])

  const addGuess = (e) => {
    e.preventDefault()
    if (guess.length === 5) {
      setGuesses(_.uniq([...guesses, guess]))
      setGuess('')
    }
  }

  const removeGuess = (idx) => {
    setGuesses(_.filter(guesses, (g, i) => i !== idx))
  }

  const getWordNeedingKey = (guesses, evaluation) => {
    for (const guess of guesses) {
      if (!evaluation[guess]) {
        return guess
      }
    }
  }

  const RenderEvaluations = ({ guesses, evaluations, setEvaluations, answer }) => {
    const [showWords, setShowWords] = useState(false)
    const [keyInput, setKeyInput] = useState('')
    const [activeWord, setActiveWord] = useState(null)
    // const [evaluations, setEvaluations] = useState({})

    const combined = guesses
      .map((g) => {
        if (!evaluations[g]) return null
        return {
          word: g,
          key: evaluations[g],
        }
      })
      .filter((i) => i)

    const filteredList = applyGuesses(starterList, combined)
    const wordNeedingKey = getWordNeedingKey(guesses, evaluations)

    const targetWord = activeWord || wordNeedingKey
    const targetLetter = _.get(targetWord, keyInput.length)

    return (
      <div className="col-6">
        <div className="d-flex flex-column align-items-center">
          {guesses.map((guess, j) => {
            let key = evaluations[guess] || 'UUUUU'
            if (guess === targetWord) {
              key = (keyInput + 'UUUUU').slice(0, 5)
            }
            const combinedGuess = {
              word: guess,
              key,
            }
            return (
              <div key={`guess-${j}`} className="text-center mb-1">
                <div className="d-flex flex-row justify-content-between">
                  <div
                    className="selectable pe-3"
                    onClick={() => {
                      setActiveWord(guess)
                    }}
                  >
                    <Guess guess={combinedGuess} />
                  </div>

                  {/* {evaluations[guess] && ( */}
                  <div
                    className={`delete`}
                    onClick={() => {
                      setEvaluations(_.omit(evaluations, guess))
                    }}
                  >
                    x
                  </div>
                </div>

                {/* )} */}
              </div>
            )
          })}
          <div className="my-3">
            {targetWord && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  // addEvaluation(targetWord, keyInput)
                  setEvaluations({
                    ...evaluations,
                    [targetWord]: getCanonicalKey(keyInput),
                  })
                  setKeyInput('')
                  setActiveWord(null)
                }}
              >
                <input
                  type="text"
                  className="font-mono form-control d-none d-md-block"
                  value={keyInput}
                  placeholder={`key for ${activeWord || wordNeedingKey}`}
                  onChange={(e) => setKeyInput(e.target.value.toLocaleUpperCase())}
                />
                <div className="d-flex justify-content-between d-md-none">
                  {targetLetter ? (
                    <>
                      <div
                        onClick={() => setKeyInput(keyInput + 'G')}
                        className="letter-box green px-2 mx-2"
                      >
                        {targetLetter}
                      </div>
                      <div
                        onClick={() => setKeyInput(keyInput + 'Y')}
                        className="letter-box yellow px-2 mx-2"
                      >
                        {targetLetter}
                      </div>
                      <div
                        onClick={() => setKeyInput(keyInput + '-')}
                        className="letter-box white px-2 mx-2"
                      >
                        {targetLetter}
                      </div>
                    </>
                  ) : (
                    <input type="submit" className="btn btn-primary btn-sm" value="Submit" />
                  )}
                </div>
              </form>
            )}
          </div>
          <div>
            {!showWords ? (
              <p className="selectable" onClick={() => setShowWords(true)}>
                Words left: {filteredList.length}
              </p>
            ) : (
              <p className="selectable" onClick={() => setShowWords(false)}>
                {filteredList.length < 8 ? <span>{filteredList.join(', ')}</span> : 'Too many'}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAnswers()
        }}
      >
        <input
          className="form-control mb-2"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
        />
        <input className="btn btn-primary" type="submit" value="Set Answers" />
      </form>

      <h1 className="title text-center">Playing {gameType.label}</h1>
      <div className="row text-center">
        <div className="col">
          <select
            value={gameType.value}
            name="gameType"
            id="gameType"
            onChange={(e) => {
              setGameType(gameOptions[e.target.value])
              setEvaluations(Array(gameOptions[e.target.value].length).fill({}))
            }}
          >
            {_.map(gameOptions, (option) => (
              <option key={`option-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <form onSubmit={addGuess} className="mb-2">
            <input
              className="font-mono form-control"
              type="text"
              value={guess}
              placeholder="your guess"
              onChange={(e) => setGuess(e.target.value.toLocaleUpperCase())}
            />
          </form>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center">
        {guesses.map((guess, i) => (
          <div key={`${guess}-${i}`} className="mb-1">
            {guess}
            <span className="delete selectable" onClick={() => removeGuess(i)}>
              x
            </span>
          </div>
        ))}
      </div>

      {!_.isEmpty(guesses) && (
        <div className="row">
          {Array(gameType.length)
            .fill(1)
            .map((x, i) => {
              return (
                <RenderEvaluations
                  key={`eval-${i}`}
                  guesses={guesses}
                  evaluations={evaluations[i]}
                  setEvaluations={(newEvaluations) => {
                    const newEvaluationsArray = [...evaluations]
                    newEvaluationsArray[i] = newEvaluations
                    console.log(newEvaluationsArray)
                    setEvaluations(newEvaluationsArray)
                  }}
                  answer={answers[i]}
                />
              )
            })}
        </div>
      )}
    </div>
  )
}

export default Quordle
