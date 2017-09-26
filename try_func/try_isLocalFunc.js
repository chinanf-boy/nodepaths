const fs = require('fs.js')
const path = require('path')

function isLocalFunc(fileAllPath) {
    return fs.existsSync(fileAllPath)
}

// const isLocalFunc = (filename) => filename.indexOf('.') >= 0 && filename.indexOf('/') >= 0

console.log(isLocalFunc(__dirname+'/path1'))