import _, { every } from 'lodash'
import {
  analysisFilter,
  createEvaluator,
  evaluateToString,
  filterWords,
  filterWordsWithAnswer,
  getAnswersMatchingKey,
  getBinsV2,
  getEliminatedCount,
  getEliminatedCountWithAnswer,
  numToKey,
} from './src/utils'
import {
  countPossibleKeys,
  miniMax,
  smallBins,
  sumLogs,
  sumRoots,
  wordsAtOrBelowLimit,
} from './src/scorers'

import db from './db_connection'
import md5 from 'md5'
import wordList from './results/official-answers.json'

// import wordList from './results/words-common-7.json'

const sleep = (ms) => {
  const time = ms / 1000
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const binAnalysis = (word, wordList, { binSizes }) => {
  const bins = getBinsV2(word, wordList)
  const totalWords = wordList.length

  const limits = binSizes.slice()

  const entries = limits.map((l) => {
    const captured = wordsAtOrBelowLimit(l)(bins)
    return {
      word,
      bin_size: l,
      words_in_bins: captured,
      pct_captured: (100 * captured) / totalWords,
    }
  })

  return entries
}

const scoreWord = (word, wordList) => {
  const bins = getBinsV2(word, wordList)

  const entry = {
    word,
    log_score: sumLogs(bins),
    sqrt_score: sumRoots(bins),
    mini_max: miniMax(bins),
    most_keys: countPossibleKeys(bins),
    small_bins_20: smallBins(bins, 20),
    small_bins_30: smallBins(bins, 30),
    small_bins_50: smallBins(bins, 50),
    words_unique: wordsAtOrBelowLimit(1),
    words_less_than_5: wordsAtOrBelowLimit(4),
  }

  return entry
}

const getLastIndex = (wordlist_hash) => {
  return db('words').max('id as lastIndex').where({ wordlist_hash }).first()
}

const fill_bins = async () => {
  const wordlist_hash = md5(JSON.stringify(wordList))

  const dbWords = await db('words').select()
  const words = dbWords.map((w) => w.word)
  for (const word of words) {
    let entries = binAnalysis(word, wordList, { binSizes: [30, 40, 50] })
    // console.log(entry)
    entries = entries.map((entry) => {
      return {
        ...entry,
        wordlist_hash,
      }
    })

    await db('word_bins').insert(entries)
  }
}

const run = async () => {
  const start = new Date()

  const wordlist_hash = md5(JSON.stringify(wordList))
  let lastIndex
  lastIndex = 0
  const lastEntry = await getLastIndex(wordlist_hash)
  ;({ lastIndex } = lastEntry)
  if (lastIndex === null) {
    lastIndex = 0
  }
  console.log(lastIndex)
  // return
  let word
  for (let i = 0; i < 1000; i++) {
    if (lastIndex >= wordList - 1) {
      return
    }
    word = wordList[lastIndex + 1]
    // console.log(word)
    const entry = {
      id: lastIndex + 1,
      ...scoreWord(word, wordList),
      wordlist_hash,
    }
    console.log(entry)
    await db('words').insert(entry).onConflict().ignore()
    lastIndex++
    // await sleep(1500)
  }

  console.log(`Total time: ${(new Date() - start) / 1000} seconds`)
}

// run().then(() => process.exit(0))

fill_bins().then(() => process.exit(0))
