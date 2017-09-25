const path = require('path')
const fs = require('fs')

//+ cmd 
// node NodePath.js filename.js

let cmdarg = process.argv[2]

const isEndJs = (match) => match.slice(match.length - 3, match.length) === '.js'

if(!cmdarg){
    throw Error("there is no index file\nlike:\n"+">node NodePath.js filename.js\n")
}else{
    cmdarg = isEndJs(cmdarg)?cmdarg:cmdarg+".js"
}



//

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


const readFilePromise = function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) 
                throw Error(err)
            let matchs = getMatch(data)

            LocalCount -= 1
            // console.log(LocalCount)
            let filematchs = getFileName(matchs)
            // LocalCount += filematchs.length
            // console.log(LocalCount)
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


const timeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const NodePath = async function (dirhost, filename) {
    let filePath = dirhost + '/' + filename;
    LocalCount +=1
    let conf = await readFilePromise(filePath)
    // console.log(LocalCount) count readFile 次数
    while(LocalCount > 0){
        await timeout(2) // v1.1 add time-async
    }
    
    
    return LocalStore
}

const writeDataToFile = (data) => {
    fs.writeFile('NodePathdata.json', data, (err) => {
        if (err) 
            throw err;
        console.log('The NodePathdata.json has been saved!');
    });
}

console.time('NodePath:time')
// console.log(process.uptime()*1000)
NodePath(__dirname, cmdarg).then((data) => {
    console.timeEnd('NodePath:time');
    console.log(JSON.stringify(data))
    writeDataToFile(JSON.stringify(data, null, '\t'))
    // console.log(JSON.stringify(LocalStore))

})