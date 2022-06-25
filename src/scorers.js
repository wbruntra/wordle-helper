import _ from 'lodash'

export const sumLogs = (arr) => {
  return _.sum(
    arr.map((val) => {
      if (val === 1) {
        return 1
      }
      return Math.log2(val)
    }),
  )
}

export const sumRoots = (arr) => {
  return _.sum(
    arr.map((val) => {
      return Math.sqrt(val)
    }),
  )
}

export const countPossibleKeys = (bins) => {
  return bins.length
}

export const miniMax = (bins) => {
  const maxBin = _.max(bins)
  return 5000 - maxBin
}

export const smallBins = (maxBinSize) => {
  const binScorer = (bins) => {
    const small = bins.filter((size) => size <= maxBinSize)
    return small.length
  }
  return binScorer
}

/**
 * Count the number of words appearing in bins of size no greater than `limit`
 * @param {number} limit
 */
export const wordsAtOrBelowLimit = (limit) => {
  /**
   * Count the number of words appearing in bins of size no greater than `limit`
   * @param {Object[]} bins - result of `getBins`
   */
  const binScorer = (bins) => {
    const small = bins.filter((size) => size <= limit)
    return _.sum(small)
  }
  return binScorer
}

const evaluateKey = (
  key,
  weightings = {
    G: 3,
    Y: 2,
    '-': 0,
  },
) => {
  const result = key.split('').reduce((acc, c) => {
    return acc + weightings[c]
  }, 0)
  return result
}

/**
 * Scoring method whereby evaluations are assigned a value according to the number of "GY-" values
 * they are expected to produce
 * @param {Object} fullBins - Bins produced by `getBins` function
 * @param {Object} weightings
 * @param {number} weightings.G
 * @param {number} weightings.Y
 */
export const weightKeys = (
  fullBins,
  weightings = {
    G: 3,
    Y: 2,
    '-': 0,
  },
) => {
  const result = _.sum(
    _.map(fullBins, (binItem, key) => {
      const val = evaluateKey(key, weightings)
      return binItem * val
    }),
  )
  return result
}
