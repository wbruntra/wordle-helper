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

export const wordsAtOrBelowLimit = (limit) => {
  const binScorer = (bins) => {
    const small = bins.filter((size) => size <= limit)
    return _.sum(small)
  }
  return binScorer
}
