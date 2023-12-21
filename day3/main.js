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
    //console.log(lineIndex, data[lineIndex], n, data[lineIndex].indexOf(n))

    let adjacentsChars = getAllAdjacents(n, { x: data[lineIndex].indexOf(n), y: lineIndex }, data)
    adjacentsChars.forEach(c => {
        if(!'.0123456789'.includes(c)) {
            return true
        }
    })
    return false
}

function getAllAdjacents(n, pos, data) {
    let len = '' + n

    let abovePositions = []
    let bottomPositions = []
    for(let i = 0; i <= len; i++) {
        abovePositions.push({
            x: pos.x + i, 
            y: pos.y - 1
        })
        bottomPositions.push({
            x: pos.x + i,
            y: pos.y + 1
        })
    }

    return [
        { x: pos.x - 1, y: pos.y - 1 }, ...abovePositions,
        { x: pos.x - 1, y: pos.y }, { x: pos.x + len, y: pos.y },
        { x: pos.x - 1, y: pos.y + 1}, ...bottomPositions
    ].map(pos => {
        if(pos.y < 0 || pos.y >= data.length
            || pos.x < 0 || pos.x >= data[0].length) {
            return undefined
        }else{
            return data[pos.y][pos.x]
        }
    }).filter(char => !!char)
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