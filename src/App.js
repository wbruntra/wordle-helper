import './App.css'
import { useState, useRef } from 'react'
import starterList from './starterList.json'
import { getEval, filterWords } from './utils'

const getRandomSlice = (arr) => {
  const start = Math.floor(Math.random() * (arr.length - 20))
  return arr.slice(start, start + 20)
}

function App() {
  const [guesses, setGuesses] = useState([])
  const [word, setWord] = useState('')
  const [key, setKey] = useState('')
  const [filtered, setFiltered] = useState(starterList.slice())
  const [mySlice, setMySlice] = useState(getRandomSlice(filtered))
  const inputEl = useRef(null)

  const resetGuesses = () => {
    setGuesses([])
    setFiltered(starterList)
  }

  const removeIdx = (arr, idx) => {
    return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
  }

  const renderBoxes = (s) => {
    const result = s.split('').map((c) => {
      if (c === 'G') {
        return <div className="box green" />
      }
      if (c === 'Y') {
        return <div className="box yellow" />
      }
      return <div className="box white" />
    })
    return result
  }

  const addGuess = (e) => {
    e.preventDefault()
    const newGuesses = [
      ...guesses,
      {
        word: word,
        key: key,
      },
    ]
    setGuesses(newGuesses)
    setWord('')
    setKey('')

    let localFiltered = applyGuesses(starterList, newGuesses)
    setFiltered(localFiltered)
    const newSlice = localFiltered.length > 20 ? getRandomSlice(localFiltered) : localFiltered
    setMySlice(newSlice)
    inputEl.current.focus()
  }

  const applyGuesses = (wordList, guesses) => {
    let result = wordList.slice()
    for (const guess of guesses) {
      const e = getEval(guess)
      result = filterWords(guess.word, e, result)
    }
    return result
  }

  const applyFilters = () => {
    let localFiltered = applyGuesses(starterList, guesses)
    setFiltered(localFiltered)
    const newSlice = localFiltered.length > 10 ? getRandomSlice(localFiltered) : localFiltered
    setMySlice(newSlice)
  }

  return (
    <div className="container">
      <h1>Wordle Helper</h1>
      <p>Enter your guesses along with the color-coded result you got from Wordle</p>
      <p>Y for yellow, G for green, any other character for a miss</p>
      <p>Example: ADDLE {`=> `} G...Y</p>
      <form onSubmit={addGuess}>
        <fieldset>
          <input
            ref={inputEl}
            value={word}
            onChange={(e) => setWord(e.target.value.toUpperCase())}
            placeholder="word"
          />
        </fieldset>
        <fieldset>
          <input
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
            <li
              onClick={() => {
                setGuesses(removeIdx(guesses, i))
              }}
              className="guess"
              key={`guess-${i}`}
            >
              {guess.word} {'=>'} {renderBoxes(guess.key)}
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
