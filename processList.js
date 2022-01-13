const fs = require('fs')

let common = fs.readFileSync('./20k-common.txt').toString().split('\n')

common = common.filter((word) => word.length === 5).map((word) => word.toUpperCase())

console.log(common.slice(0, 10))
console.log(common.length)

fs.writeFileSync('./20k-common.json', JSON.stringify(common, null, 2))
