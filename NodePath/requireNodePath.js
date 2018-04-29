const path = require('path')
const readFile = require('./readFile')
const matchModule = require('./match-module')

/**
 * @description 从文件中-require,获取缓存
 * @param {String} getFile 
 * @returns {Array}
 */
async function requireNodePath( filePath ){

    let match = true

    while(match){
        const fileData = await readFile(filePath)

        match = matchModule(fileData)

        match = null
    }

    
    let R_results = {}
    
    
    return R_results
}

module.exports = {
    requireNodePath
}