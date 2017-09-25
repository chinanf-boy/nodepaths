const fs = require('fs')



function isLocalFunc(fileAllPath) {
    return fs.existsSync(fileAllPath)
}

console.log(isLocalFunc(__dirname+'/path1'))