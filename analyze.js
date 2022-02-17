import { analysisFilter, createEvaluator, getBestChoice } from './src/utils'

import _ from 'lodash'
import db from './db_connection'
import fullWordList from './results/official-answers.json'
import md5 from 'md5'

const getBestRootScore = async (words) => {
  const best = await db('words')
    .select('word')
    .max('sqrt_score as max_score')
    .whereIn('word', words)
    .first()
  // console.log(best)
  return {
    word: best.word,
    score: best.max_score,
  }
}

export const getRoundWinProbability = (filtered, { method = 'random', fullWordList }) => {
  const overallBest = useFullListForAmazingHit(wordList, fullWordList, { verbose: true })
  console.log(overallBest)
}

const getOldResult = async (starting_word, answer, scoring_method) => {
  const record = await db('records')
    .select()
    .where({
      starting_word,
      answer,
      method: scoring_method,
    })
    .first()
  return record
}

export const play = async (
  starting_word,
  fullWordList,
  {
    method = 'random',
    chosen_answer,
    all_random = false,
    binLimit = 1,
    verbose = false,
    strictness_proportion = 1,
    guess_limit = 99,
  },
) => {
  const answer = chosen_answer ? chosen_answer : _.sample(fullWordList)
  let guesses = [starting_word]
  if (method === 'random' && all_random) {
    guesses = [_.sample(fullWordList)]
  }

  if (verbose) {
    console.log(`Playing ${answer}, starting with ${guesses[0]}`)
  }

  let filtered = fullWordList.slice()

  let key
  let best
  let guess
  while (guesses.length < guess_limit && guesses.slice(-1)[0] !== answer) {
    guess = guesses.slice(-1)[0]
    key = createEvaluator(answer)(guess)

    filtered = analysisFilter({ word: guess, key }, filtered)
    best = await getBestChoice(filtered, fullWordList, {
      scoring_method: method,
      easy_mode_bin_limit: binLimit,
      strictness_proportion,
      verbose,
      db,
    })

    guesses.push(best.word)
  }

  const gameWon = guesses.slice(-1)[0] === answer

  // const wordlist_hash = md5(JSON.stringify(fullWordList))

  const entry = {
    answer,
    starting_word: guesses[0],
    guesses: gameWon ? guesses.length : null,
    method,
    won: gameWon,
    // wordlist_hash,
  }

  return db('records').insert(entry)
}

const trial = async (starting_word, { do_all_words = false, allow_reruns = false } = {}) => {
  // const methods = [
  //   'maximize_keys',
  //   'sum_logs',
  //   'sum_roots',
  //   'first_word',
  //   'best_rootscore',
  //   'minimax',
  //   'random',
  //   'small_bins',
  //   'most_unique',
  //   'easy_mode',
  //   'weighted_score',
  // ]
  const start = new Date()
  const method = 'sum_roots'

  let answers = do_all_words ? fullWordList : _.sampleSize(fullWordList, 200)
  // answers = fullWordList.slice(0, 200)

  console.log(starting_word, method)
  for (const answer of answers) {
    const oldResult = await getOldResult(starting_word, answer, method)
    if (!oldResult || allow_reruns) {
      const r = await play(starting_word, fullWordList, { method, chosen_answer: answer })
      // console.log(`New word ${answer}`, 'record id', r)
    }
  }
  console.log(`Total time: ${(new Date() - start) / 1000} seconds`)
}

const trials = async () => {
  // await trial('LATER')
  // return
  let top_words
  top_words = await db('words').select().orderBy('most_keys', 'desc').limit(15)

  // top_words = await db.raw(`SELECT word, words_in_bins as less_than_20, pct_captured
  // from word_bins wb
  // where bin_size = 1
  // and wordlist_hash = "6158b668573f59b302882ed542f8c3f4"
  // order by words_in_bins desc limit 10;`)

  top_words = top_words.map((w) => w.word)
  // top_words = ['CRANE', 'STALE', 'STARE', 'TRACE']

  // top_words = ['TABLE']

  for (const top_word of top_words) {
    console.log(top_word)
    await trial(top_word, { allow_reruns: false, do_all_words: true })
  }
}

if (require.main === module) {
  const start = new Date()

  trials().then(() => process.exit(0))

  console.log(`Total time: ${(new Date() - start) / 1000} seconds`)
}
