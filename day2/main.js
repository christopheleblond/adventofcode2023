var fs = require('fs')

fs.readFile('./data.txt', (err, data) => {
    processInput(data.toString())
})

function processInput(input) {
    let lines = input.split('\r\n').filter(line => !!line && line !== '\r\n')

    var result = lines    
    .map(line => parseLine(line))
    //.filter(game => accept(game))
    //.map(game => game.gameId)
    .map(game => minimumOfCubes(game))
    .map(part => pow(part))
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

function minimumOfCubes(game) {

    let res = game.parts.reduce((acc, cur) => {
        if(!!cur.red && cur.red > acc.red) {
            acc.red = cur.red
        }
        if(!!cur.blue && cur.blue > acc.blue) {
            acc.blue = cur.blue
        }
        if(!!cur.green && cur.green > acc.green) {
            acc.green = cur.green
        }
        
        return acc
    }, {
        red: 0, blue: 0, green: 0
    })

    return res
}

function pow(part) {
    return (part.red || 1) * (part.blue || 1) * (part.green || 1)
}