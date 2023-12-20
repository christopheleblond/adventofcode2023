var fs = require('fs')

fs.readFile('./test.txt', (err, data) => {
    processInput(data.toString())
})

function processInput(data) {
    let lines = data
        .split('\r\n').filter(line => !!line && line !== '\r\n')

    let result = 0
    for(let i = 0; i < lines.length; i++ ) {
        let value = processLine(i, lines)
        result += value
    }

   console.log(result)
}

function processLine(lineIndex, data) {

    let sum = getAllNumbersOfLine(data[lineIndex])
                .filter(n => isNumberAdjacentWithSymbol(n, lineIndex, data))
                .reduce((acc, cur) => acc + cur, 0)

    return sum
}

function isNumberAdjacentWithSymbol(n, lineIndex, data) {
    console.log(lineIndex, data[lineIndex], n, data[lineIndex].indexOf(n))
    return n % 2 === 0
}

function getCharAt(x, y, lines) {
    if(y < lines.length) {
        if(x < lines[y].length) {
            return lines[y][x]
        }
    }
    return undefined
}

function getAllNumbersOfLine(line) {
    let numbers = []
    let regexp = /\d+/g
    while((r = regexp.exec(line)) != null) {
        numbers.push(parseInt(r[0]))
    }
    return numbers
}