import './App.css'
import { useState, useRef } from 'react'
import starterList from './starterList.json'
import { getEval, filterWords } from './utils'

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
  const [word, setWord] = useState('')
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

  // const renderGuesses = (guesses) => {
  //   const result = guesses.map((guess) => {})
  //   return guess.key.split('').map((c, i) => {
  //     if (c === 'G') {
  //       return <div className="box green">{guess.word[i]}</div>
  //     }
  //     if (c === 'Y') {
  //       return <div className="box yellow">{guess.word[i]}</div>
  //     }
  //     return <div className="box white">{guess.word[i]}</div>
  //   })
  //   return result
  // }

  const renderGuess = (guess) => {
    return guess.key.split('').map((c, i) => {
      if (c === 'G') {
        return <div className="box green">{guess.word[i]}</div>
      }
      if (c === 'Y') {
        return <div className="box yellow">{guess.word[i]}</div>
      }
      return <div className="box white">{guess.word[i]}</div>
    })
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
      const e = getEval(guess)
      result = filterWords(guess.word, e, result)
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
          <p>Example: ADDLE {`=> `} G...Y</p>
        </>
      )}
      <form onSubmit={addGuess}>
        <fieldset className="mb-0">
          <input
            ref={inputEl}
            value={word}
            onChange={(e) => setWord(e.target.value.toUpperCase())}
            placeholder="word"
          />
        </fieldset>
        <fieldset className="mb-0">
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
            <li className="guess" key={`guess-${i}`}>
              {renderGuess(guess)}
              {/* {guess.word} {'=>'} {renderBoxes(guess.key)} */}
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
