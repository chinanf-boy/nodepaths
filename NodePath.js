const path = require('path')
const fs = require('fs')

let LocalStore = {
    'host': __dirname
}

const getTime = (running = true) =>{

    if(global&&running){
        process.uptime
    }
}

const getDirName = (Path) => path.dirname(Path)

const getBaseName = (Path) => path.basename(Path)

const getFileName = (matchs) => {
    return matchs ?
        matchs.map(x => {
            if (isRquire(x)) {
                return x.slice(9, -2)
            } else {
                let localx = x
                    .split(' ')
                    .filter(x => x != 'from' && x)
                return localx.slice(1, localx.length - 1)
            }
        }) : false
}

const isLocalFunc = (filename) => filename.indexOf('.') >= 0 && filename.indexOf('/') >= 0

// const isModuleFile = (Path)

const getMatch = (data) => data.match(/(require|from)([(\s]+)?(\'|\")[\S]+((\'|\")([\)])?)/g);

const isRquire = (match) => match.indexOf('require') >= 0 ?
    true :
    false

const isEndJs = (match) => match.slice(match.length - 3, match.length) === '.js'

const NodePath = async function (dirhost, filename) {
    let filePath = dirhost + '/' + filename;

    await fs.readFile(filePath, 'utf8', (err, data) => {
        if (err)
            throw err;
        let matchs = getMatch(data)
        let filematchs = getFileName(matchs)
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

    });
}

console.time('NodePath:time')
// console.log(process.uptime()*1000)
NodePath(__dirname, 'test1.js').then(() =>{console.timeEnd('NodePath:time');console.log(LocalStore)})