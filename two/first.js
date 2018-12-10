const fs = require('fs')

const getStringFromFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err)
      }

      resolve(data.toString())
    })
  }) 
}

const getArrayFromString = (string) => {
  return string.split(/\s+/)
};


(async function () {
  const input = await getStringFromFile('data.txt')
  const inputArray = getArrayFromString(input)
  let twoTotal = 0
  let threeTotal = 0

  for (let id of inputArray) {
    const idsCount = Array.prototype.reduce.call(id, ((hashMap, letter) => hashMap.set(letter, (hashMap.get(letter) || 0) + 1)), new Map());

    for (let count of new Set(idsCount.values()).values()) {
      if (count === 2) twoTotal++
      if (count === 3) threeTotal++
    }
  }

  console.log(twoTotal * threeTotal)

})();