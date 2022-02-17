import _, { every } from 'lodash'
import {
  countPossibleKeys,
  miniMax,
  sumLogs,
  sumRoots,
  weightKeys,
  wordsAtOrBelowLimit,
} from './src/scorers'

import db from './db_connection'
import { getBins } from './src/utils'
import md5 from 'md5'
// import wordList from './results/official-answers.json'
import wordList from './results/common-plus-official.json'

// import wordList from './results/words-common-7.json'

const sleep = (ms) => {
  const time = ms / 1000
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const binAnalysis = (word, wordList, { binSizes }) => {
  const bins = getBins(word, wordList)
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
  const fullBins = getBins(word, wordList, { returnObject: true })
  const bins = Object.values(fullBins)

  const entry = {
    log_score: sumLogs(bins),
    sqrt_score: sumRoots(bins),
    mini_max: miniMax(bins),
    most_keys: countPossibleKeys(bins),
    weighted_score: weightKeys(fullBins),
    equal_weight_score: weightKeys(fullBins, { G: 1, Y: 1, '-': 0 }),
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
    let entries = binAnalysis(word, wordList, { binSizes: [1, 5, 10, 30, 50, 100] })
    entries = entries.map((entry) => {
      return {
        ...entry,
        wordlist_hash,
      }
    })

    await db('word_bins').insert(entries)
  }
}

const score_words = async (wordList) => {
  const wordlist_hash = md5(JSON.stringify(wordList))
  const words = await db('words').select('id', 'word')
  console.log(words.slice(0, 10))
  const score_entries = []
  for (const word of words) {
    const entry = {
      ...scoreWord(word.word, wordList),
      word_id: word.id,
      wordlist_hash,
    }
    score_entries.push(entry)
  }

  const batches = Math.ceil(score_entries.length / 400)
  let entry_batch
  for (let i = 0; i < batches; i++) {
    entry_batch = score_entries.slice(i * 400, (i + 1) * 400)
    await db('word_scores').insert(entry_batch)
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

// fill_bins().then(() => process.exit(0))

score_words(wordList)
