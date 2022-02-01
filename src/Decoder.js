// import starterList from './starterList.json'
import { filterWords, getEval, guessReverser } from './utils'
import { useRef, useState } from 'react'

import Guess from './Guess'
import starterList from './data/valid-word-list-xl.json'

const config = {
  maxListLength: 20,
}

const getRandomSlice = (arr, size) => {
  const start = Math.floor(Math.random() * (arr.length - size))
  return arr.slice(start, start + size)
}

function App() {
  const [touched, setTouched] = useState(false)
  const [guesses, setGuesses] = useState([])
  const [answer, setAnswer] = useState('')
  const [key, setKey] = useState('')
  const [filtered, setFiltered] = useState(starterList.slice())
  const [mySlice, setMySlice] = useState(getRandomSlice(filtered, config.maxListLength))
  const inputEl = useRef(null)

  const resetGuesses = () => {
    setGuesses([])
    setFiltered(starterList)
    setTouched(false)
  }

  const removeIdx = (arr, idx) => {
    return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
  }

  const addGuess = (e) => {
    e.preventDefault()
    const newGuesses = [
      // ...guesses,
      {
        word: answer,
        key: key,
      },
    ]
    setGuesses(newGuesses)
    setKey('')
    setTouched(true)

    let localFiltered = applyGuesses(starterList, newGuesses)
    setFiltered(localFiltered)
    const newSlice =
      localFiltered.length > config.maxListLength
        ? getRandomSlice(localFiltered, config.maxListLength)
        : localFiltered
    setMySlice(newSlice)
    inputEl.current.focus()
  }

  const applyGuesses = (wordList, guesses) => {
    let result = wordList.slice()
    for (const guess of guesses) {
      result = guessReverser(answer, guess.key, result)
    }
    return result
  }

  const applyFilters = () => {
    let localFiltered = applyGuesses(starterList, guesses)
    setFiltered(localFiltered)
    const newSlice =
      localFiltered.length > config.maxListLength
        ? getRandomSlice(localFiltered, config.maxListLength)
        : localFiltered
    setMySlice(newSlice)
  }

  return (
    <div className="container">
      <h1>Wordle Helper</h1>
      {!touched && (
        <>
          <p>Enter your guesses along with the color-coded result you got from Wordle</p>
          <p>Y for yellow, G for green, any other character for a miss</p>
          <p>Example: ADDLE {`=> `} G***Y</p>
        </>
      )}
      <form onSubmit={addGuess}>
        <fieldset className="mb-0">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toUpperCase())}
            placeholder="word"
          />
        </fieldset>
        <fieldset className="mb-0">
          <input
            ref={inputEl}
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            placeholder="result"
          />
        </fieldset>
        <input className="pure-button" type="submit" value="Add Guess" />
      </form>
      <ul>
        {guesses.map((guess, i) => {
          return (
            <li className="guess" key={`guess-${i}`}>
              <Guess guess={guess} />
              <span
                className="delete"
                onClick={() => {
                  setGuesses(removeIdx(guesses, i))
                }}
              >
                x
              </span>
            </li>
          )
        })}
      </ul>
      <p>
        <button className="pure-button" onClick={applyFilters}>
          Apply Filters
        </button>
        <button className="pure-button ml-3" onClick={resetGuesses}>
          Clear Guesses
        </button>
      </p>

      <p>
        There {filtered.length === 1 ? 'is ' : 'are'} {filtered.length} word
        {filtered.length === 1 ? '' : 's'} left
      </p>
      <ul>
        {mySlice.map((word, i) => {
          return <li key={`word-${i}`}>{word}</li>
        })}
      </ul>
    </div>
  )
}

export default App
