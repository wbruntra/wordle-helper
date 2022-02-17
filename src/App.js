import { analysisFilter, getBins, getCanonical, getCanonicalKey } from './utils'
import { useRef, useState } from 'react'
import { weightKeys, wordsAtOrBelowLimit } from './scorers'

import Guess from './Guess'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'
import examples from './examples.json'
// import officialList from './data/official-answers-alphabetical.json'
// import starterList from './data/words-common-7.json'
import startingList from './data/common-plus-official.json'

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

const orderEntireWordList = (filteredList, { only_filtered = false, orderByWeight = false }) => {
  const unique_scorer = wordsAtOrBelowLimit(1)
  if (filteredList.length === startingList.length) {
    return []
  }
  let results

  results = filteredList.map((word) => {
    const fullBins = getBins(word, filteredList, { returnObject: true })
    const bins = Object.values(fullBins)
    return {
      word,
      score: unique_scorer(bins),
      weightedScore: weightKeys(fullBins) / (filteredList.length * 15),
    }
  })

  const filteredOrder = _.orderBy(results, (o) => o.score, 'desc')
  if (!(only_filtered || filteredOrder[0].score === filteredList.length)) {
    results = startingList.map((word) => {
      const fullBins = getBins(word, filteredList, { returnObject: true })
      const bins = Object.values(fullBins)
      return {
        word,
        score: unique_scorer(bins),
        weightedScore: weightKeys(fullBins) / (filteredList.length * 15),
      }
    })
  }

  if (orderByWeight) {
    return _.orderBy(results, (o) => o.weightedScore, 'desc')
  }

  return _.orderBy(results, (o) => o.score, 'desc')
}

function App() {
  const [touched, setTouched] = useState(false)
  const [guesses, setGuesses] = useState([])
  const [word, setWord] = useState('')
  const [key, setKey] = useState('')
  const [filtered, setFiltered] = useState(startingList.slice())
  const inputEl = useRef(null)
  const [showDepth, setShowDepth] = useState(false)
  const [bins, setBins] = useState([])
  const [binsWord, setBinsWord] = useState('')
  const [orderedWords, setOrderedWords] = useState([])
  const [usingOnlyFiltered, setUsingOnlyFiltered] = useState(true)
  const [example, setExample] = useState(_.sample(examples))
  const [showExample, setShowExample] = useState(false)
  const [error, setError] = useState('')

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
    previewGuess(getCanonical(word), newGuesses)

    setGuesses(newGuesses)
    setWord('')
    setKey('')
    setTouched(true)

    let localFiltered = applyGuesses(startingList, newGuesses)
    setFiltered(localFiltered)
    setUsingOnlyFiltered(true)

    if (localFiltered.length < 450) {
      const newWordOrder = orderEntireWordList(localFiltered, { only_filtered: true })
      setOrderedWords(newWordOrder)
    }

    // inputEl.current.focus()
    document.activeElement.blur()
  }

  const previewGuess = (word, guesses) => {
    let localFiltered = startingList.slice()
    for (const guess of guesses) {
      if (guess.word === word) {
        break
      }
      localFiltered = analysisFilter(guess, localFiltered)
    }

    let newBins = getBins(word, localFiltered, { returnObject: true, showMatches: true })
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
      filteredWords = analysisFilter(guess, filteredWords)
    }

    return filteredWords
  }

  const applyFilters = ({ only_use_filtered = true, order_by_weight = false } = {}) => {
    let localFiltered = applyGuesses(startingList, guesses)
    setUsingOnlyFiltered(only_use_filtered)
    setFiltered(localFiltered)
    const newOrdered = orderEntireWordList(localFiltered, {
      only_filtered: only_use_filtered,
      orderByWeight: order_by_weight,
    })
    setOrderedWords(newOrdered)
  }

  const toPct = (fraction) => {
    return (fraction * 100).toFixed(2) + '%'
  }

  const renderBins = (bins) => {
    const binSizes = bins.map((bin) => Object.values(bin)[0].length)

    const uniqueWords = _.sum(binSizes.filter((size) => size === 1))

    const limits = [5, 20]
    const summaryStats = limits.map((limit) => {
      const scorer = wordsAtOrBelowLimit(limit)
      return {
        limit,
        wordCount: scorer(binSizes),
      }
    })

    const totalWords = _.sum(binSizes)

    return (
      <>
        <ReactTooltip id="key-definition" type="dark" effect="solid">
          <p>
            KEY is the key you would have gotten if the correct answer were one of the words shown
            in the second column
          </p>
        </ReactTooltip>

        <table className="table table-dark table-striped mt-4 w-100">
          <thead>
            <tr>
              <th data-tip data-for="key-definition" scope="col">
                <span className="tooltip-underline">KEY</span>
              </th>
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
            {summaryStats.map((smry, i) => {
              return (
                <tr key={`limit-${smry.limit}`}>
                  <td>
                    Chance of &lt;{'='} {smry.limit}
                  </td>
                  <td>{toPct(smry.wordCount / totalWords)}</td>
                  <td>{smry.wordCount}</td>
                </tr>
              )
            })}
            {bins.map((bin, i) => {
              const matches = Object.values(bin)[0].length
              return (
                <tr key={`bin-${i}`}>
                  <td>{Object.keys(bin)[0]}</td>
                  <td className="">
                    {`${
                      matches < 20
                        ? Object.values(bin)[0].join(', ')
                        : `[${matches > 600 ? 'way ' : ''}too many to show]`
                    }`}
                  </td>
                  <td className="">{matches}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
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
            {/* <p className="example mb-1">{example.word}</p>
            <p className="example mb-1">{example.key}</p> */}
            <div className="mb-4">
              <div
                onClick={() => {
                  // const ex = _.sample(examples)
                  // setExample(ex)
                  setShowExample(true)
                  // setWord(example.word)
                  // setKey(example.key)
                }}
                className="guess selectable"
              >
                <Guess guess={{ word: example.word, key: example.key }} />
              </div>
            </div>
          </>
        )}
        {/* <div>
          <div className="row justify-content-center">
            <div className="guess col-4">
              <div className="text-start">
                <Guess guess={{ word, key: key }} />
              </div>
            </div>
          </div>
        </div> */}
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

        <div className="d-flex flex-column text-center mb-3">
          {guesses.map((guess, i) => {
            return (
              <div className="guess selectable-guess mb-3" key={`guess-${i}`}>
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
                    setError('')
                    setGuesses(removeIdx(guesses, i))
                  }}
                >
                  x
                </span>
              </div>
            )
          })}
        </div>
        {guesses.length === 0 && (
          <p>
            There {filtered.length === 1 ? 'is ' : 'are'} {filtered.length} word
            {filtered.length === 1 ? '' : 's'} left
          </p>
        )}

        {guesses.length > 0 && (
          <>
            <div>
              <hr style={{ color: 'white' }} />

              <p>
                {usingOnlyFiltered ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => applyFilters({ only_use_filtered: false })}
                  >
                    Use Full Wordlist
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => applyFilters({ only_use_filtered: true })}
                  >
                    Use Only Valid Words
                  </button>
                )}
                <button className="btn btn-primary btn-sm ms-3" onClick={resetGuesses}>
                  Clear Guesses
                </button>
              </p>

              <p>
                There {filtered.length === 1 ? 'is ' : 'are'} {filtered.length} word
                {filtered.length === 1 ? '' : 's'} left
              </p>
              {!showDepth && orderedWords.length > 0 && (
                <>
                  <p>Showing best {usingOnlyFiltered ? 'among available' : 'overall'} choices</p>

                  <div className="row justify-content-center mb-3">
                    <div className="col-10 col-md-6">
                      <ReactTooltip id="solve-definition" type="dark" effect="solid">
                        <span>
                          SOLVE means there will be only one word <br />
                          remaining for the next guess
                        </span>
                      </ReactTooltip>

                      <table className="table table-dark table-striped mt-3 w-100">
                        <thead>
                          <tr>
                            <th scope="col">WORD</th>
                            <th
                              style={{
                                textDecorationStyle: 'dotted',
                                textDecorationLine: 'underline',
                                textUnderlineOffset: '4px',
                              }}
                              data-tip
                              data-for="solve-definition"
                              scope="col"
                            >
                              CHANCE TO SOLVE
                            </th>
                            {/* <th
                              className="selectable"
                              onClick={() =>
                                applyFilters({
                                  only_use_filtered: usingOnlyFiltered,
                                  order_by_weight: true,
                                })
                              }
                              scope="col"
                            >
                              WEIGHTED SCORE
                            </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {orderedWords.slice(0, 10).map((word, i) => {
                            return (
                              <tr key={`ordered-${i}`}>
                                <td>{word.word}</td>
                                <td>{((100 * word.score) / filtered.length).toFixed(1)}%</td>
                                {/* <td>{(100 * word.weightedScore).toFixed(1)}</td> */}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              <hr style={{ color: 'white' }} />
            </div>
          </>
        )}

        {guesses.length > 0 && (
          <div className="container">
            {showDepth ? (
              <p className="selectable" onClick={() => setShowDepth(false)}>
                Hide Analysis
              </p>
            ) : (
              <p className="selectable" onClick={() => setShowDepth(true)}>
                Show Analysis for Last Guess
              </p>
            )}
            {showDepth && (
              <>
                <h2>{binsWord}</h2>
                {renderBins(bins)}
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default App
