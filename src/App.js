import {
  analysisFilter,
  filterWords,
  getBestHitFromFullList,
  getBinsV2,
  getCanonical,
  getCanonicalKey,
} from './utils'
import { useRef, useState } from 'react'

import Guess from './Guess'
import _ from 'lodash'
// import officialList from './data/official-answers-alphabetical.json'
// import starterList from './data/words-common-7.json'
import startingList from './data/common-plus-official.json'
import { wordsAtOrBelowLimit } from './scorers'

const config = {
  maxListLength: 36,
}

const getRandomSlice = (arr, size) => {
  const start = Math.floor(Math.random() * (arr.length - size))
  return arr.slice(start, start + size)
}

const orderWordList = (wordList) => {
  const unique_scorer = wordsAtOrBelowLimit(1)
  const results = wordList.map((word) => {
    const bins = getBinsV2(word, wordList)
    return {
      word,
      score: unique_scorer(bins),
    }
  })
  return _.orderBy(results, (o) => o.score, 'desc')
}

const orderEntireWordList = (filteredList, { only_filtered = false }) => {
  const unique_scorer = wordsAtOrBelowLimit(1)

  const filteredResults = filteredList.map((word) => {
    const bins = getBinsV2(word, filteredList)
    return {
      word,
      score: unique_scorer(bins),
    }
  })
  const filteredOrder = _.orderBy(filteredResults, (o) => o.score, 'desc')
  if (only_filtered || filteredOrder[0].score === filteredList.length) {
    return filteredOrder
  }

  const results = startingList.map((word) => {
    const bins = getBinsV2(word, filteredList)
    return {
      word,
      score: unique_scorer(bins),
    }
  })
  return _.orderBy(results, (o) => o.score, 'desc')
}

function App() {
  const [touched, setTouched] = useState(false)
  const [guesses, setGuesses] = useState([])
  const [word, setWord] = useState('')
  const [key, setKey] = useState('')
  const [filtered, setFiltered] = useState(startingList.slice())
  const [mySlice, setMySlice] = useState(getRandomSlice(filtered, config.maxListLength))
  const inputEl = useRef(null)
  const [showDepth, setShowDepth] = useState(false)
  const [bins, setBins] = useState([])
  const [binsWord, setBinsWord] = useState('')
  const [orderedWords, setOrderedWords] = useState([])

  const resetGuesses = () => {
    setGuesses([])
    setFiltered(startingList)
    setTouched(false)
  }

  const removeIdx = (arr, idx) => {
    return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
  }

  const addGuess = (e) => {
    e.preventDefault()
    const newGuesses = [
      ...guesses,
      {
        word: getCanonical(word),
        key: getCanonicalKey(key),
      },
    ]
    previewGuess(getCanonical(word), newGuesses)

    setGuesses(newGuesses)
    setWord('')
    setKey('')
    setTouched(true)

    let localFiltered = applyGuesses(startingList, newGuesses)
    setFiltered(localFiltered)

    if (localFiltered.length < 300) {
      const newWordOrder = orderEntireWordList(localFiltered, { only_filtered: true })
      setOrderedWords(newWordOrder)
    }

    const newSlice =
      localFiltered.length > config.maxListLength
        ? getRandomSlice(localFiltered, config.maxListLength)
        : localFiltered
    setMySlice(newSlice)

    inputEl.current.focus()
  }

  const previewGuess = (word, guesses) => {
    let localFiltered = startingList.slice()
    for (const guess of guesses) {
      if (guess.word === word) {
        break
      }
      localFiltered = analysisFilter(guess, localFiltered)
    }

    let newBins = getBinsV2(word, localFiltered, true, true)
    newBins = _.map(newBins, (value, key) => ({ [key]: value }))
    newBins = _.sortBy(newBins, (value, key) => Object.values(value)[0].length)
    setBinsWord(`${word} (${localFiltered.length} words)`)
    setBins(newBins)
  }

  const endPreview = () => {
    setBins([])
  }

  const applyGuesses = (wordList, guesses) => {
    let filteredWords = wordList.slice()
    for (const guess of guesses) {
      // const e = getEval(guess)
      filteredWords = filterWords(guess, filteredWords)
    }

    return filteredWords
  }

  const applyFilters = () => {
    let localFiltered = applyGuesses(startingList, guesses)
    setFiltered(localFiltered)
    const newOrdered = orderEntireWordList(localFiltered, { only_filtered: false })
    setOrderedWords(newOrdered)
    // const newSlice =
    //   localFiltered.length > config.maxListLength
    //     ? getRandomSlice(localFiltered, config.maxListLength)
    //     : localFiltered
    // setMySlice(newSlice)
  }

  const toPct = (fraction) => {
    return (fraction * 100).toFixed(2) + '%'
  }

  const renderBins = (bins) => {
    const binSizes = bins.map((bin) => Object.values(bin)[0].length)

    const uniqueWords = _.sum(binSizes.filter((size) => size === 1))
    const doubleWords = _.sum(binSizes.filter((size) => size === 2))

    const lessThanLimit = 5
    const lessThanLimitWords = _.sum(binSizes.filter((size) => size < lessThanLimit))

    const lessThanLimit20 = _.sum(binSizes.filter((size) => size < 20))

    const totalWords = _.sum(binSizes)

    return (
      <table className="table table-dark table-striped mt-4 w-100">
        <thead>
          <tr>
            <th scope="col">KEY</th>
            <th scope="col">WORDS</th>
            <th scope="col"># OF MATCHES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '35%' }}>Chance of unique answer</td>
            <td>{toPct(uniqueWords / totalWords)}</td>
            <td>{uniqueWords}</td>
          </tr>
          {/* <tr>
            <td style={{ width: '25%' }}>Chance of 2 words</td>
            <td>{toPct(doubleWords / totalWords)}</td>
            <td>{doubleWords}</td>
          </tr> */}
          <tr>
            <td>Chance of list &lt; {lessThanLimit}</td>
            <td>{toPct(lessThanLimitWords / totalWords)}</td>
            <td>{lessThanLimitWords}</td>
          </tr>
          <tr>
            <td>Chance of list &lt; {20}</td>
            <td>{toPct(lessThanLimit20 / totalWords)}</td>
            <td>{lessThanLimit20}</td>
          </tr>
          {bins.map((bin, i) => {
            const matches = Object.values(bin)[0].length
            return (
              <tr key={`bin-${i}`}>
                <td>{Object.keys(bin)[0]}</td>
                <td className="">
                  {`${matches < 20 ? Object.values(bin)[0].join(', ') : '[too many to show]'}`}
                </td>
                <td className="">{matches}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div className="container text-center">
        <h1>Wordle Helper</h1>
        {!touched && (
          <>
            <p>Enter your guesses along with the color-coded result you got from Wordle</p>
            <p>Y for yellow, G for green, any other character for a miss</p>
            <p>Example: ADDLE {`=> `} G***Y</p>
            <div className="mb-4">
              <div className="guess">
                <Guess guess={{ word: 'ADDLE', key: 'G...Y' }} />
              </div>
            </div>
          </>
        )}
        <div className="row justify-content-center">
          <form className="mb-3 col-3" onSubmit={addGuess}>
            <fieldset className="mb-3">
              <input
                className="font-mono form-control"
                ref={inputEl}
                value={word}
                onChange={(e) => setWord(e.target.value.toUpperCase())}
                placeholder="word"
              />
            </fieldset>
            <fieldset className="mb-3">
              <input
                className="font-mono form-control"
                value={key}
                onChange={(e) => setKey(e.target.value.toUpperCase())}
                placeholder="result"
              />
            </fieldset>
            {/* <fieldset className="mb-0">
            <label>Show preview?</label>
            <input
              type="checkbox"
              value={showDepth}
              onChange={(e) => {
                previewGuess()
                showDepth ? setShowDepth(false) : setShowDepth(true)
              }}
              placeholder="Show Preview"
            />
          </fieldset> */}
            <input className="btn btn-primary btn-sm" type="submit" value="Add Guess" />
          </form>
        </div>

        <ul className="text-center mb-4">
          {guesses.map((guess, i) => {
            return (
              <li className="guess selectable-guess mb-3" key={`guess-${i}`}>
                <div
                  className="d-inline"
                  onClick={() => {
                    previewGuess(guess.word, guesses)
                  }}
                >
                  <Guess guess={guess} />
                </div>
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
          <button className="btn btn-primary btn-sm" onClick={applyFilters}>
            Use Full Wordlist
          </button>
          <button className="btn btn-primary btn-sm ms-3" onClick={resetGuesses}>
            Clear Guesses
          </button>
        </p>
        <hr style={{ color: 'white' }} />

        <p>
          There {filtered.length === 1 ? 'is ' : 'are'} {filtered.length} word
          {filtered.length === 1 ? '' : 's'} left
        </p>
        {!showDepth && (
          <div className="row justify-content-center mb-3">
            <table className="table table-dark table-striped mt-3 w-50">
              <thead>
                <tr>
                  <th scope="col">WORD</th>
                  <th scope="col">CHANCE TO SOLVE</th>
                </tr>
              </thead>
              <tbody>
                {orderedWords.slice(0, 10).map((word, i) => {
                  return (
                    <tr key={`ordered-${i}`}>
                      <td>{word.word}</td>
                      <td>{((100 * word.score) / filtered.length).toFixed(1)}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          //   {mySlice.map((word, i) => {
          //     return (
          //       <div className="col-2" key={`word-${i}`}>
          //         {word}
          //       </div>
          //     )
          //   })}
          // </div>
        )}
        <hr style={{ color: 'white' }} />
      </div>
      <div className="container">
        {showDepth ? (
          <p className="selectable" onClick={() => setShowDepth(false)}>
            Hide Details
          </p>
        ) : (
          <p className="selectable" onClick={() => setShowDepth(true)}>
            Show Details for Last Guess
          </p>
        )}
        {showDepth && (
          <>
            {/* <button
              className="btn btn-primary btn-sm mb-2"
              onClick={() => {
                previewGuess(word, guesses)
              }}
            >
              Update Table For Current Word
            </button> */}

            <h2>{binsWord}</h2>
            {renderBins(bins)}
          </>
        )}
      </div>
    </>
  )
}

export default App
