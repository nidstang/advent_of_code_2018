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

const getArrayFromStringByToken = (string, token) => {
  return string.split(/\s+/)
}

const getInputArrayFromFile = async file => {
  const inputString = await getStringFromFile(file)
  return getArrayFromStringByToken(inputString)
}

const createCircularArray = function* (arr) {
  let i = 0
  while (true) {
    if (i === arr.length) {
      i = 0
    }

    yield arr[i++]
  }
};


(async function () {
  const inputArray = await getInputArrayFromFile('data.txt')
  const map = new Map();
  let total = 0;

  const circular = createCircularArray(inputArray);

  
  while (!map.has(total)) {
    map.set(total, 1);
    total += eval(circular.next().value)
  }

  console.log(total);
})()

