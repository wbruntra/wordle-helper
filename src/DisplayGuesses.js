import _, { remove } from 'lodash'
import { filterWordsUsingGuessResult, getBins, getCanonical, getCanonicalKey } from './utils'
import { useEffect, useRef, useState } from 'react'
import { weightKeys, wordsAtOrBelowLimit } from './scorers'

import DisplayStatus from './DisplayStatus'
import Guess from './Guess'
import ReactTooltip from 'react-tooltip'
import { nyt as startingList } from './wordlists'

function DisplayGuesses({ guesses }) {
  return (
    <>
      <div className="container text-center">
        <div className="d-flex flex-row justify-content-around">
          return (
          <DisplayStatus
            guesses={guesses}
            removeGuess={removeGuess}
            setGuesses={() => {}}
            resetGuesses={resetGuesses}
            startingList={startingList}
          />
          )
        </div>
      </div>
    </>
  )
}

export default DisplayGuesses
