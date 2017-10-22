#!/usr/bin/env node
'use script'
const path = require('path')
const fs = require('fs')

const requireNodePath = require('./requireNodePath')
const writeDataToFile = require('./writeDataToFile')
// const fromNodePath = require('./fromNodePath')

const getMatch = (data) => data.match(/(require|from)([(\s]+)?(\'|\")[\S]+((\'|\")([\)])?)/g);
// const isEndJs = (match, endfile) => match.slice(match.length - 3, match.length) === endfile

// function isLocalFunc(fileAllPath) {
//      if(fs.existsSync(fileAllPath)){
//         return true
//      }else{
//         return false
//      }
// }

// const putEndFile = (file, endfile) => { 
//         if(isEndJs(file, endfile)) {
//             return file
//         }

//     return file + endfile
// }

// 获得参数
let getFileName = process.argv[2]
if(!getFileName){
    console.log(`Usage
    $ nodepath [file-name] [es5]

        es5 -> use in like "import react from 'react'" file module

    Example:

    $ NodePath filename
    `)
    return 
}
let hostdir = process.argv[1]
let addFrom = process.argv[3]

// console.info(...require.cache[hostdir].children.map(x => x.filename))

let missDir = [
    hostdir,
    ...require.cache[hostdir].children.map(x => x.filename)
]

console.time('NodePath:time')

let getFile = path.join(process.cwd(), getFileName)

if (addFrom === 'es5') {

    require('babel-register')
    let R_result = requireNodePath.requireNodePath( getFile, missDir)
    // console.log(Path_requireNodePath)

    console.log(R_result)
    writeDataToFile.writeDataToFile(R_result)
    console.timeEnd('NodePath:time')
    
    // console.log(process.uptime()*1000)
    // let endfiles = ['.js', '.jsx']

    // endfiles.forEach(
    //     (endfile, index) => {
    //     getFileName = putEndFile(getFileName, endfile)
    //     let getFile = path.join(process.cwd(), getFileName)

    //     if (isLocalFunc(getFile)) {

    //         fromNodePath.NodePath(process.cwd(), getFileName).then((data) => {
    //             console.log(data)
    //             writeDataToFile.writeDataToFile(data)
    //             // console.log(JSON.stringify(LocalStore))
    //             console.timeEnd('NodePath:time');

    //         })
    //     }
    //     else if((index + 1) == endfiles.length){
    //          throw Error(getFile, ' -- 无法找到 js 和 jsx 后缀 文件')
    //     }

    // })

}else{

    // getFileName = putEndFile(getFileName, '.js')

    // if(isLocalFunc(getFile)){
        let R_result = requireNodePath.requireNodePath( getFile, missDir)
        // console.log(Path_requireNodePath)

        console.log(R_result)
        writeDataToFile.writeDataToFile(R_result)
        console.timeEnd('NodePath:time')
    // }
}
// 

