#!/usr/bin/env node
'use script'
const path = require('path')
const fs = require('fs')

const {requireNodePath} = require('./requireNodePath')
const {writeDataToFile} = require('./writeDataToFile')

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

// *** Fix cwd node_modules
const cwdModule = path.join(process.cwd(), "node_modules")
module.paths.push(process.cwd())
module.paths.push(cwdModule)
// 

console.time('NodePath:time')

let getFile = path.join(process.cwd(), getFileName)

if (addFrom === 'es5') {

    require('babel-register')({
        "presets": ["stage-2","react","es2015"]
    })

    let R_result = requireNodePath( getFile )

    console.log(R_result)
    writeDataToFile(R_result)
    console.timeEnd('NodePath:time')
}else{
        let R_result = requireNodePath( getFile )
        

        console.log(R_result)
        writeDataToFile(R_result)
        console.timeEnd('NodePath:time')
    
}

