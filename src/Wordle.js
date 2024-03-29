import { commonPlusOfficial, nytAll, nytSolutions } from './wordlists/index'
import { getCanonical, getCanonicalKey } from './utils';
import { useEffect, useRef, useState } from 'react'

import DisplayStatus from './DisplayStatus'
import { FiSettings } from 'react-icons/fi'
import Guess from './Guess'
import WordListModal from './WordListModal'
import _ from 'lodash'
import { evaluateToString } from './utils'
import examples from './examples.json'

const wordLists = {
  nytSolutions,
  commonPlusOfficial,
  nytAll,
}

function Wordle() {
  const [touched, setTouched] = useState(false)
  const [guesses, setGuesses] = useState([])
  const [word, setWord] = useState('')
  const [key, setKey] = useState('')
  const [wordListName, setWordListName] = useState('nytAll')
  const [currentFilteredList, setFiltered] = useState(wordLists[wordListName].slice())
  const inputEl = useRef(null)
  const [bins, setBins] = useState([])
  const [example, setExample] = useState(_.sample(examples))
  const [showExample, setShowExample] = useState(true)
  const [error, setError] = useState('')
  const [countOnly, setCountOnly] = useState(true)
  const [showGuessInput, setShowGuessInput] = useState(true)
  const [showWordListModal, setShowWordListModal] = useState(false)
  const [answerInput, setAnswerInput] = useState('')
  const [clickedGuess, setClickedGuess] = useState(null)

  const params = new URLSearchParams(window.location.search)

  useEffect(() => {
    let newFilteredList = wordLists[wordListName].slice()
    setFiltered(newFilteredList)
  }, [wordListName, guesses])

  const resetGuesses = () => {
    setGuesses([])
    setTouched(false)
  }

  const addGuess = (e) => {
    e.preventDefault()
    console.log(word)
    if (!(word.length === 5 && key.length === 5)) {
      setError('Invalid Input')
      return
    }
    setError('')
    setShowExample(false)
    const newGuesses = [
      ...guesses,
      {
        word: getCanonical(word),
        key: getCanonicalKey(key),
      },
    ]
    // previewGuess(getCanonical(word), newGuesses)

    console.log('setting to', newGuesses)
    setClickedGuess(null)

    setGuesses(newGuesses)
    setWord('')
    setKey('')
    setTouched(true)

    document.activeElement.blur()

    inputEl.current.focus()
  }

  const removeGuess = (index) => {
    const newGuesses = [...guesses]
    newGuesses.splice(index, 1)
    setGuesses(newGuesses)
  }

  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-end">
          <div>
            <span className="selectable" onClick={() => setShowWordListModal(true)}>
              <FiSettings size={'2em'} />
            </span>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <h1>Wordle Helper</h1>
        {!guesses.length > 0 && (
          <>
            <p>Enter your guesses along with the color-coded response you got from Wordle</p>
            <p className="text-left">
              Y → yellow <br />
              G → green <br />
              Any other character for a miss
            </p>
            <p className="example">
              Example: {example.word}{' '}
              <span style={{ fontSize: '1.8em' }} className="arrow">
                →
              </span>{' '}
              {example.key}
              <br />
              {/* (click to demonstrate) */}
            </p>
            <div className="mb-4">
              {word.length < 5 && (
                <div
                  onClick={() => {
                    setShowExample(true)
                  }}
                  className="guess selectable"
                >
                  <Guess guess={{ word: example.word, key: example.key }} />
                </div>
              )}
            </div>
          </>
        )}
        {(guesses.length > 0 || word.length === 5) && (
          <div className="mb-4">
            <div
              style={{ visibility: word.length < 5 ? 'hidden' : 'visible' }}
              className="guess"
              onClick={() => {
                setShowGuessInput(true)
              }}
            >
              <Guess guess={{ word: word, key: (key + 'UUUUU').slice(0, 5) }} />
            </div>
          </div>
        )}

        <div className="row justify-content-center">
          <form className="mb-3 col-8 col-md-3" onSubmit={addGuess}>
            <fieldset className="mb-2">
              <input
                className="font-mono form-control"
                ref={inputEl}
                value={word}
                onChange={(e) => {
                  setWord(e.target.value.toUpperCase())
                  if (e.target.value.toUpperCase().length === 5 && answerInput.length === 5) {
                    const newKey = evaluateToString(e.target.value.toUpperCase(), answerInput)
                    setKey(newKey)
                  }
                }}
                placeholder={showExample ? example.word : 'GUESS'}
              />
            </fieldset>
            <fieldset className="mb-3">
              <input
                className="font-mono form-control"
                value={key}
                onChange={(e) => setKey(e.target.value.toUpperCase())}
                placeholder={showExample ? example.key : `response`}
              />
            </fieldset>
            <input
              className="btn btn-primary"
              type="submit"
              value="Add Guess"
              disabled={
                !(word.length === key.length && word.length === currentFilteredList[0].length)
              }
            />
          </form>
          {error !== '' && (
            <div>
              <p className="error">{error}</p>
            </div>
          )}
        </div>

        <DisplayStatus
          guesses={guesses}
          setGuesses={setGuesses}
          resetGuesses={resetGuesses}
          startingList={currentFilteredList}
          removeGuess={removeGuess}
          clickedGuess={clickedGuess}
          setClickedGuess={setClickedGuess}
        />
      </div>
      <WordListModal
        wordList={wordListName}
        setWordList={setWordListName}
        show={showWordListModal}
        handleClose={() => {
          setShowWordListModal(false)
        }}
        answerInput={answerInput}
        setAnswerInput={setAnswerInput}
      />
    </>
  )
}

export default Wordle
