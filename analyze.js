import {
  analysisFilter,
  createEvaluator,
  evaluateToString,
  filterWords,
  filterWordsWithAnswer,
  getAllKeys,
  getAnswersMatchingKey,
  getBins,
  getBinsV2,
  getEliminatedCount,
  getEliminatedCountWithAnswer,
  getKeyDictionary,
} from './src/utils'
import {
  countPossibleKeys,
  miniMax,
  smallBins,
  sumLogs,
  sumRoots,
  wordsBelowLimit,
} from './scorers'

import _ from 'lodash'
import db from './db_connection'
import md5 from 'md5'
import wordList from './results/official-answers.json'

const sleep = (ms) => {
  const time = ms
  return new Promise((resolve) => setTimeout(resolve, time))
}

const scoreWord = (word, wordList) => {
  const bins = getBinsV2(word, wordList)

  const entry = {
    word,
    log_score: sumLogs(bins),
    sqrt_score: sumRoots(bins),
    mini_max: miniMax(bins),
    most_keys: countPossibleKeys(bins),
  }

  return entry
}

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

const getLastIndex = () => {
  return db('words').max('id as lastIndex').first()
}

export const getBestChoice = async (wordList, scoring_method) => {
  // if (scoring_method === 'best_rootscore' || wordList.length > 200) {
  //   const bestRootscore = await getBestRootScore(wordList)
  //   return bestRootscore
  // }

  let scorer
  let maxBin
  switch (scoring_method) {
    case 'small_bins':
      maxBin = Math.ceil(wordList.length / 10)
      scorer = smallBins(maxBin)
      break
    case 'fill_small_bins':
      maxBin = Math.ceil(Math.min([4, wordList.length / 10]))
      scorer = wordsBelowLimit(maxBin)
      break
    case 'most_unique':
      scorer = wordsBelowLimit(1)
      break
    case 'sum_roots':
      scorer = sumRoots
      break
    case 'maximize_keys':
      scorer = countPossibleKeys
      break
    case 'sum_logs':
      scorer = sumLogs
      break
    case 'first_word':
      return {
        word: wordList[0],
        score: 990,
      }
    case 'minimax':
      scorer = miniMax
      break
    case 'random':
      return {
        word: _.sample(wordList),
      }
  }

  if (wordList.length === 1) {
    return { word: wordList[0], score: 999 }
  }

  const wordlist_hash = md5(JSON.stringify(wordList)).slice(0, 20)
  const cached_answer = await getCachedAnswer(wordlist_hash, scoring_method)

  if (cached_answer) {
    return cached_answer
  }

  const result = []

  for (const word of wordList) {
    let bins = getBinsV2(word, wordList)

    result.push({
      word,
      score: scorer(bins),
    })
  }

  const best = _.maxBy(result, (r) => r.score)

  const entry = {
    best_word: best.word,
    score: best.score,
    wordlist_hash,
    method: scoring_method,
  }

  await db('cached_evaluations').insert(entry)
  return best
}

const getOldResult = (starting_word, answer, scoring_method) => {
  return db('records')
    .select()
    .where({
      starting_word,
      answer,
      method: scoring_method,
    })
    .first()
}

const getCachedAnswer = async (wordlist_hash, method) => {
  const bestWord = await db('cached_evaluations')
    .select()
    .where({
      wordlist_hash,
      method,
    })
    .first()

  if (!bestWord) {
    return null
  }

  return {
    word: bestWord.best_word,
    score: bestWord.score,
  }
}

const play = async (starting_word, method, chosen_answer, all_random = false) => {
  const answer = chosen_answer ? chosen_answer : _.sample(wordList)
  let guesses = [starting_word]
  if (method === 'random' && all_random) {
    guesses = [_.sample(wordList)]
  }

  let filtered = wordList.slice()

  let key
  let best
  let guess
  while (guesses.slice(-1)[0] !== answer) {
    guess = guesses.slice(-1)[0]
    key = createEvaluator(answer)(guess)

    filtered = analysisFilter({ word: guess, key }, filtered)
    best = await getBestChoice(filtered, method)

    guesses.push(best.word)
  }

  const entry = {
    answer,
    starting_word: guesses[0],
    guesses: guesses.length,
    method,
  }

  return db('records').insert(entry)
}

const trial = async (starting_word, allow_reruns = false) => {
  // methods = ['maximize_keys', 'sum_logs', 'sum_roots', 'first_word', 'best_rootscore', 'minimax', 'random', 'small_bins', 'most_unique]
  const start = new Date()
  const method = 'most_unique'

  for (const answer of wordList) {
    const oldResult = await getOldResult(starting_word, answer, method)
    if (!oldResult || allow_reruns) {
      await play(starting_word, method, answer)
    }
  }
  console.log(`Total time: ${(new Date() - start) / 1000} seconds`)

  return
}

const trials = async () => {
  // await trial('LATER')
  // return
  let top_words
  // top_words = await db('words').select().orderBy('small_bins_20', 'desc').limit(10)

  top_words = await db.raw(`SELECT word, words_in_bins as less_than_20, pct_captured  
	from word_bins wb 
	where bin_size = 1
	and wordlist_hash = "6158b668573f59b302882ed542f8c3f4"
	order by words_in_bins desc limit 10;`)

  top_words = top_words.map((w) => w.word)

  for (const top_word of top_words) {
    console.log(top_word)
    await trial(top_word)
  }
}

if (require.main === module) {
  const start = new Date()

  trials().then(() => process.exit(0))

  console.log(`Total time: ${(new Date() - start) / 1000} seconds`)
}
