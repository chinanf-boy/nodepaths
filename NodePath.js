const path = require('path')
const fs = require('fs')

let LocalStore = {
    'host': __dirname
}

let LocalCount = 0

const getTime = (running = true) => {

    if (global && running) {
        process.uptime
    }
}

const getDirName = (Path) => path.dirname(Path)

const getBaseName = (Path) => path.basename(Path)

const getFileName = (matchs) => {
    return matchs
        ? matchs.map(x => {
            if (isRquire(x)) {
                return x.slice(9, -2)
            } else {
                let localx = x
                    .split(' ')
                    .filter(x => x != 'from' && x)
                return localx.slice(1, localx.length - 1)
            }
        })
        : false
}

const isLocalFunc = (filename) => filename.indexOf('.') >= 0 && filename.indexOf('/') >= 0

// const isModuleFile = (Path)

const getMatch = (data) => data.match(/(require|from)([(\s]+)?(\'|\")[\S]+((\'|\")([\)])?)/g);

const isRquire = (match) => match.indexOf('require') >= 0
    ? true
    : false

const isEndJs = (match) => match.slice(match.length - 3, match.length) === '.js'

const readFilePromise = function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) 
                reject(err);
            let matchs = getMatch(data)

            LocalCount -= 1

            let filematchs = getFileName(matchs)
            LocalCount += filematchs.length
            if (filematchs) {
                LocalStore[filePath] = filematchs;
                filematchs.forEach(x => {

                    if (isEndJs(x) && isLocalFunc(x)) {
                        NodePath(getDirName(filePath), x)
                    } else if (isLocalFunc(x)) {
                        NodePath(getDirName(filePath), x + '.js')
                    }
                })
            }
            resolve(': ' + JSON.stringify(filematchs));

        });
    });
}

const NodePath = async function (dirhost, filename) {
    let filePath = dirhost + '/' + filename;
    do 
        {
            let conf = await readFilePromise(filePath)
        }
    while (LocalCount > 0)return LocalStore
}

const writeDataToFile = (data) => {
    fs.writeFile('data.json', data, (err) => {
        if (err) 
            throw err;
        console.log('The file has been saved!');
    });
}

console.time('NodePath:time')
// console.log(process.uptime()*1000)
NodePath(__dirname, 'test1.js').then((data) => {
    console.timeEnd('NodePath:time');
    console.log(JSON.stringify(data))
    writeDataToFile(JSON.stringify(data, null, '\t'))
    // console.log(JSON.stringify(LocalStore))

})