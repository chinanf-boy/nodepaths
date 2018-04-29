#!/usr/bin/env node
(async function hello(){
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
    process.exit(0)
}
let hostdir = process.argv[1]
let addFrom = process.argv[3]
let cwd = path.join(process.cwd(),getFileName)

while(cwd !== '/'){
    let cwdModule = path.join(path.dirname(cwd),'node_modules')
    module.paths.unshift(cwdModule)
    cwd = path.dirname(cwdModule)
}

console.time('NodePath:time')

let filePath = path.join(process.cwd(), getFileName)

await requireNodePath(filePath)

})()
