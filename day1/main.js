var fs = require('fs')

fs.readFile('./data.txt', (err, data) => {
    processInput(data.toString())
})

function processInput(input) {
    let lines = input.split('\r\n').filter(line => !!line && line !== '\r\n')

    var result = lines    
    .map(line => evalLine(line))
    .reduce((acc, cur) => acc + cur, 0)

    console.log(result)
}

function evalLine(line) {
    let first = undefined
    let last = undefined

    let alphas = ['one','two','three','four','five','six','seven','eight','nine']
    let numbers = ['1','2','3','4','5','6','7','8','9']

    let tokens = [...alphas, ...numbers]

    let firstIndex = line.length
    let lastIndex = -1
    for(let i = 0; i < tokens.length; i++) {
        let t = tokens[i]
        let index = line.indexOf(t)
        let lindex = line.lastIndexOf(t)
        let value = 0
        if(i < alphas.length) {            
            value = parseInt(numbers[alphas.indexOf(t)])
        }else{
            value = parseInt(t)
        }

        if(index >= 0 && index < firstIndex) {
            firstIndex = index
            first = value
        }
        if(lindex >= 0 && lindex > lastIndex) {
            lastIndex = lindex
            last = value
        }
    }

    return parseInt('' + first + last);
}
