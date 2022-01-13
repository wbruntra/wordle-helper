import masterWords from './words.json'

import fs from 'fs'

const starterList = masterWords.filter((word) => {
  return word.length === 5
})

fs.writeFileSync('./starterList.json', JSON.stringify(starterList, null, 2))
