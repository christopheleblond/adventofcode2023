var fs = require('fs')

fs.readFile('./data.txt', (err, data) => {
    processInput(data.toString())
})

function len(n) {
    return 
}

function processInput(data) {
    let lines = data
        .split('\r\n').filter(line => !!line && line !== '\r\n')

    let result = 0
    for(let i = 0; i < lines.length; i++ ) {
        let value = processLine(i, lines, result)
        result += value
    }

   console.log(result)
}

function processLine(lineIndex, data, r) {

    let validNumbers = getAllNumbersOfLine(data[lineIndex])
                        .filter(n => isNumberAdjacentWithSymbol(n, lineIndex, data))

    return validNumbers.reduce((acc, cur) => acc + cur, 0)
}

function isNumber(c) {
    if(c === undefined) {
        return false
    }
    return !isNaN(c)
}

function isNumberAdjacentWithSymbol(n, lineIndex, data) {    

    let numberIndex = data[lineIndex].indexOf(n)
    let len = ('' + n).length

    let charBefore = data[lineIndex][numberIndex - 1]
    let charAfter = data[lineIndex][numberIndex + len]

    let numberNotFound = isNumber(charBefore) || isNumber(charAfter)

    while(numberNotFound && numberIndex >= 0 && numberIndex < data[lineIndex].length) {
        numberIndex = data[lineIndex].indexOf(n, numberIndex + len)        
        charBefore = data[lineIndex][numberIndex - 1]
        charAfter = data[lineIndex][numberIndex + len]
        numberNotFound = isNumber(charBefore) || isNumber(charAfter)        
    }
  
    let adjacentsChars = getAllAdjacents(n, { x: numberIndex, y: lineIndex }, data)
    return adjacentsChars.filter(c => c != '.').length > 0
}

function getAllAdjacents(n, pos, data) {
    let len = ('' + n).length
    
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

    let r = [
        { x: pos.x - 1, y: pos.y - 1 }, ...abovePositions,
        { x: pos.x - 1, y: pos.y }, { x: pos.x + len, y: pos.y },
        { x: pos.x - 1, y: pos.y + 1}, ...bottomPositions
    ].map(pos => getCharAt(pos.x, pos.y, data))
    .filter(char => !!char)    

    return r
}

function getCharAt(x, y, lines) {
    if(y >= 0 && y < lines.length) {
        if(x >= 0 && x < lines[y].length) {
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
