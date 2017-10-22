#!/usr/bin/env node
'use script'
const path = require('path')
const fs = require('fs')

const requireNodePath = require('./requireNodePath')
const writeDataToFile = require('./writeDataToFile')
// const fromNodePath = require('./fromNodePath')

const getMatch = (data) => data.match(/(require|from)([(\s]+)?(\'|\")[\S]+((\'|\")([\)])?)/g);
const isEndJs = (match, endfile) => match.slice(match.length - 3, match.length) === endfile

function isLocalFunc(fileAllPath) {
     if(fs.existsSync(fileAllPath)){
        return true
     }else{
         throw Error('no such file\n'+fileAllPath+'\n')
     }
}

const putEndFile = (file, endfile) => {
    if(isEndJs(file, endfile)) {
        return file
    }
    return file + endfile
}

// 获得参数
let getFileName = process.argv[2]
if(!getFileName){
    throw Error("there is no index file\nlike:\n"+">node NodePath.js filename.js\n")
}
let hostdir = process.argv[1]
let addFrom = process.argv[3]

console.info(...require.cache[hostdir].children.map(x => x.filename))

let missDir = [
    hostdir,
    ...require.cache[hostdir].children.map(x => x.filename)
]

console.time('NodePath:time')

if(addFrom === 'es5'){
    console.error(';P no done')
    //  
}else{

    getFileName = putEndFile(getFileName, '.js')

    let getFile = path.join(process.cwd(), getFileName)
    if(isLocalFunc(getFile)){
        let R_result = requireNodePath.requireNodePath( getFile, missDir)
        // console.log(Path_requireNodePath)
        console.log(R_result)
        writeDataToFile.writeDataToFile(R_result)
    }
}
console.timeEnd('NodePath:time')
// 

