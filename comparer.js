import fs from 'fs'
import md5 from 'md5'
import nytOfficial from './nyt-words.json'
import oldOfficial from './results/official-answers-ordered.json'

const run = () => {
  console.log(nytOfficial.slice(0, 10))
  const hashedNyt = nytOfficial.map((word) => {
    return md5(word).slice(0, 8)
  })
  console.log(hashedNyt.slice(0, 20))

  const hashedOld = oldOfficial.map((word) => {
    return md5(word).slice(0, 8)
  })
  console.log(hashedOld.slice(0, 20))

  fs.writeFileSync('./results/nyt-hashed.json', JSON.stringify(hashedNyt, null, 2))
  fs.writeFileSync('./results/old-hashed.json', JSON.stringify(hashedOld, null, 2))
}

run()
