import _, { remove } from 'lodash'
import { filterWordsUsingGuessResult, getBins, getCanonical, getCanonicalKey } from './utils'
import { useEffect, useRef, useState } from 'react'
import { weightKeys, wordsAtOrBelowLimit } from './scorers'

import DisplayStatus from './DisplayStatus'
import Guess from './Guess'
import ReactTooltip from 'react-tooltip'
import examples from './examples.json'
// import officialList from './data/official-answers-alphabetical.json'
// import starterList from './data/words-common-7.json'
// import startingList from './data/common-plus-official.json'
import { nytAll as startingList } from './wordlists'

function Dordle() {
  const [touched, setTouched] = useState(false)
  const [responses, setResponses] = useState([])
  const [word, setWord] = useState('')
  const [key, setKey] = useState('')
  const inputEl = useRef(null)
  const [example, setExample] = useState(_.sample(examples))
  const [showExample, setShowExample] = useState(false)
  const [error, setError] = useState('')

  const resetGuesses = () => {
    setResponses([])
    setTouched(false)
  }

  const removeGuess = (idx) => {
    const removeIdx = (arr, idx) => {
      return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
    }
    const newResponses = _.cloneDeep(responses).map((responseGroup) => {
      return removeIdx(responseGroup, idx)
    })
    setResponses(newResponses)
  }

  const testInput = (i) => {
    const keys = i.split(',')
    return _.every(keys.map((key) => key.length === 5))
  }

  const addGuess = (e) => {
    e.preventDefault()
    if (!(word.length === 5 && testInput(key))) {
      setError('Invalid Input')
      return
    }

    const keys = key.split(',')
    const newResponses = _.cloneDeep(responses)
    const responseItems = keys.map((k) => {
      return {
        word: getCanonical(word),
        key: getCanonicalKey(k),
      }
    })
    responseItems.forEach((res, i) => {
      if (!newResponses[i]) {
        newResponses[i] = [res]
      } else {
        newResponses[i].push(res)
      }
    })
    setResponses(newResponses)

    setError('')
    setShowExample(false)
    // const newGuesses = [
    //   ...responses,
    //   {
    //     word: getCanonical(word),
    //     key: getCanonicalKey(key),
    //   },
    // ]
    // previewGuess(getCanonical(word), newGuesses)

    // setResponses(newGuesses)
    setWord('')
    setKey('')
    setTouched(true)

    document.activeElement.blur()
  }

  return (
    <>
      <div className="container text-center">
        <h1>Wordle Helper</h1>
        {!responses.length > 0 && (
          <>
            <p>Enter your guesses along with the color-coded response you got from Wordle</p>
            <p className="text-left">
              Y → yellow <br />
              G → green <br />
              Any other character for a miss
            </p>
            <p className="example"></p>
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
              // disabled={!(word.length === key.length && word.length === startingList[0].length)}
            />
          </form>
          {error !== '' && (
            <div>
              <p className="error">{error}</p>
            </div>
          )}
        </div>
        <div className="d-flex flex-row justify-content-around">
          {responses.map((guesses, i) => {
            return (
              <DisplayStatus
                key={`response-${i}`}
                guesses={guesses}
                removeGuess={removeGuess}
                setGuesses={() => {}}
                resetGuesses={resetGuesses}
                startingList={startingList}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Dordle
