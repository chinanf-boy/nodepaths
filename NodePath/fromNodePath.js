const path = require('path')
const fs = require('fs')

//+ cmd 
// node NodePath.js filename.js

//

let LocalStore = {
    
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
                    .filter(x => x != 'from' && x).join('')
                return localx.slice(1, localx.length - 1)
            }
        })
        : false
}

const isLocalDir = (filename) => filename.indexOf('.') == 0 || filename.indexOf('/') >= 0

const builtinLibs = [
    'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'crypto',
    'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'net',
    'os', 'path', 'perf_hooks', 'punycode', 'querystring', 'readline', 'repl',
    'stream', 'string_decoder', 'tls', 'tty', 'url', 'util', 'v8', 'vm', 'zlib','http2'
  ];

const isNativeModule = (filename) => {
    let result = false;
    if(isEndJs(filename)){
        for (let i=0;i<builtinLibs.length;i++){
            if(filename === builtinLibs[i]+'.js'){

                result = true
                break
            }
        }
    }
    else{
        for (let i=0;i<builtinLibs.length;i++){
            if(filename === builtinLibs[i]){
                result = true
                break
            }
        }
    }
    return result
}

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
                    if (isLocalDir(x)) {
                        // isLocalDir 查看 是否 有 ./ 之类  本目录 
                        //
                        if (isLocalFunc(path.join(getDirName(fileAllPath), x))) {
                            
                            NodePath(getDirName(fileAllPath), x)
                        }
                    }
                    else if (!isNativeModule(x)){

                        //isNativeModule 丑方法 验证是否原生
                        // node 源代码 有个 https://github.com/nodejs/node/blob/master/lib/module.js#L24
                        // const NativeModule = require('native_module');
                        // https://github.com/nodejs/node/blob/master/lib/module.js#L461 应用 内置模块 查询
                        //
                        if (isLocalFunc(path.join(getDirName(fileAllPath), x))) {
                            
                            NodePath(getDirName(fileAllPath), x)
                        }
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
    
    LocalStore['hostDir'] = path.dirname(path.join(process.cwd(), filearg))
    
    return LocalStore
}

module.exports = {
    NodePath
}
// const writeDataToFile = (data) => {
//     fs.writeFile('NodePathdata.json', data, (err) => {
//         if (err) 
//             throw err;
//         console.log('The NodePathdata.json has been saved!');
//     });
// }
