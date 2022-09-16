import {
  applyGuesses,
  filterWordsUsingGuessResult,
  getBins,
  getCanonical,
  getCanonicalKey,
} from './utils'
// import officialList from './data/official-answers-alphabetical.json'
// import starterList from './data/words-common-7.json'
// import startingList from './data/common-plus-official.json'
// import startingList from './data/valid-words.json'
import { commonPlusOfficial, nytAll, nytSolutions } from './wordlists/index'
import { useEffect, useRef, useState } from 'react'
import { weightKeys, wordsAtOrBelowLimit } from './scorers'

import { BsFillGearFill } from 'react-icons/bs'
import DisplayStatus from './DisplayStatus'
import { FiSettings } from 'react-icons/fi'
import Guess from './Guess'
import ReactTooltip from 'react-tooltip'
import WordListModal from './WordListModal'
import _ from 'lodash'
import examples from './examples.json'

const startingList = commonPlusOfficial

const wordLists = {
  nytSolutions,
  commonPlusOfficial,
  nytAll,
}

const getWeightedScores = (filteredList) => {
  const results = filteredList.map((word) => {
    const bins = getBins(word, filteredList, { returnObject: true })
    return {
      word,
      score: weightKeys(bins),
    }
  })

  return _.orderBy(results, (o) => o.score, 'desc')
}

function App() {
  const [touched, setTouched] = useState(false)
  const [guesses, setGuesses] = useState([])
  const [word, setWord] = useState('')
  const [key, setKey] = useState('')
  const [wordListName, setWordListName] = useState('commonPlusOfficial')
  const [currentFilteredList, setFiltered] = useState(wordLists[wordListName].slice())
  const inputEl = useRef(null)
  const [bins, setBins] = useState([])
  const [example, setExample] = useState(_.sample(examples))
  const [showExample, setShowExample] = useState(false)
  const [error, setError] = useState('')
  const [countOnly, setCountOnly] = useState(true)
  const [showGuessInput, setShowGuessInput] = useState(true)
  const [showWordListModal, setShowWordListModal] = useState(false)

  const params = new URLSearchParams(window.location.search)

  useEffect(() => {
    console.log('changing to', wordListName)
    let newFilteredList = wordLists[wordListName].slice()
    console.log(newFilteredList.length)
    // if (guesses.length > 0) {
    //   newFilteredList = applyGuesses(guesses, newFilteredList)
    // }
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

    setGuesses(newGuesses)
    setWord('')
    setKey('')
    setTouched(true)

    document.activeElement.blur()
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
            <span className='selectable' onClick={() => setShowWordListModal(true)}>
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
              (click to demonstrate)
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
                onChange={(e) => setWord(e.target.value.toUpperCase())}
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
        />
      </div>
      <WordListModal
        wordList={wordListName}
        setWordList={setWordListName}
        show={showWordListModal}
        handleClose={() => {
          setShowWordListModal(false)
        }}
      />
    </>
  )
}

export default App
