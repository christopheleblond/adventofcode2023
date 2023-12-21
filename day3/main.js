var fs = require('fs')

console.log('<style>')
console.log(" * { background-color: black; color: white; font-family: monospace}")
console.log('</style>')

fs.readFile('./data.txt', (err, data) => {
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

    let validNumbers = getAllNumbersOfLine(data[lineIndex])
    .filter(n => isNumberAdjacentWithSymbol(n, lineIndex, data))

    let output = data[lineIndex]
    validNumbers.forEach(n => output = output.replace(n, "<span style='color:yellow'>" + n + "</span>") )

    console.log(output, ' : ', validNumbers.join(" "))

    return validNumbers.reduce((acc, cur) => acc + cur, 0)
}

function isNumberAdjacentWithSymbol(n, lineIndex, data) {
    let adjacentsChars = getAllAdjacents(n, { x: data[lineIndex].indexOf(n), y: lineIndex }, data)
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

    return [
        { x: pos.x - 1, y: pos.y - 1 }, ...abovePositions,
        { x: pos.x - 1, y: pos.y }, { x: pos.x + len, y: pos.y },
        { x: pos.x - 1, y: pos.y + 1}, ...bottomPositions
    ].map(pos => getCharAt(pos.x, pos.y, data))
    .filter(char => !!char)
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