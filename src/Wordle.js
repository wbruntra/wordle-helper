import {
  applyGuesses,
  filterWordsUsingGuessResult,
  getBins,
  getCanonical,
  getCanonicalKey,
} from './utils'
import { useEffect, useRef, useState } from 'react'
import { weightKeys, wordsAtOrBelowLimit } from './scorers'

import DisplayStatus from './DisplayStatus'
import Guess from './Guess'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'
import examples from './examples.json'
// import officialList from './data/official-answers-alphabetical.json'
// import starterList from './data/words-common-7.json'
// import startingList from './data/common-plus-official.json'
import startingList from './data/valid-words.json'

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
  const [currentFilteredList, setFiltered] = useState(startingList.slice())
  const inputEl = useRef(null)
  const [bins, setBins] = useState([])
  const [example, setExample] = useState(_.sample(examples))
  const [showExample, setShowExample] = useState(false)
  const [error, setError] = useState('')
  const [countOnly, setCountOnly] = useState(true)

  const params = new URLSearchParams(window.location.search)

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

  const endPreview = () => {
    setBins([])
  }

  return (
    <>
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
              <div
                onClick={() => {
                  setShowExample(true)
                }}
                className="guess selectable"
              >
                <Guess guess={{ word: example.word, key: example.key }} />
              </div>
            </div>
          </>
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
              disabled={!(word.length === key.length && word.length === startingList[0].length)}
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
          startingList={startingList}
        />
      </div>
    </>
  )
}

export default App
