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
    'hostDir': path.dirname(path.join(process.cwd(), cmdarg))
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

// const isLocalFunc = (filename) => filename.indexOf('.') >= 0 && filename.indexOf('/') >= 0
function isLocalFunc(fileAllPath) {
    return fs.existsSync(fileAllPath)
}


// const isModuleFile = (Path)

const getMatch = (data) => data.match(/(require|from)([(\s]+)?(\'|\")[\S]+((\'|\")([\)])?)/g);

const isRquire = (match) => match.indexOf('require') >= 0
    ? true
    : false


const readFilePromise = function readFilePromise(fileAllPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileAllPath, 'utf8', (err, data) => {
            if (err) 
                throw Error(err)
            let matchs = getMatch(data)

            LocalCount -= 1
            // console.log(LocalCount)
            let filematchs = getFileName(matchs)
            // LocalCount += filematchs.length
            // console.log(LocalCount)
            if (filematchs) {
                LocalStore[fileAllPath] = filematchs;
                filematchs.forEach(x => {
                    //不存在本目录，不需要递归

                    if (!isEndJs(x)) {
                        x = x + '.js';
                    }
                    if (isLocalFunc(path.join(getDirName(fileAllPath), x))){
                        
                        NodePath(getDirName(fileAllPath), x)
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

const NodePath = async function (cmdDir, filearg) {
    let filePath = path.join(cmdDir, filearg);
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
NodePath(process.cwd(), cmdarg).then((data) => {
    console.timeEnd('NodePath:time');
    console.log(JSON.stringify(data))
    writeDataToFile(JSON.stringify(data, null, '\t'))
    // console.log(JSON.stringify(LocalStore))

})