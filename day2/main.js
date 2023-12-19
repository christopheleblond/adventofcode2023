var fs = require('fs')

fs.readFile('./data.txt', (err, data) => {
    processInput(data.toString())
})

function processInput(input) {
    let lines = input.split('\r\n').filter(line => !!line && line !== '\r\n')

    var result = lines    
    .map(line => parseLine(line))
    .filter(game => accept(game))
    .map(game => game.gameId)
    .reduce((acc, cur) => acc + cur, 0)

    console.log(result)
}

function parseLine(line) {
    let tokens = line.split(":")

    let gameId = parseInt(tokens[0].replace("Game ", ""))

    let parts = tokens[1].split(";")
        .map(part => part.split(",")
            .map(c => { 
                let cubes = c.trim().split(" "); 
                return {color: cubes[1], count: parseInt(cubes[0])}
            }).reduce((acc, cur) => {
                acc[cur.color] = cur.count;
                return acc;
            }, {}))

    return {gameId, parts}
}

function accept(game) {
    let res = game.parts.filter(p => (!p.red || p.red <= 12) 
    && (!p.green || p.green <= 13) 
    && (!p.blue || p.blue <= 14))

    return res.length === game.parts.length
}