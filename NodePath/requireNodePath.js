const path = require('path')
/**
 * @description 从文件中-require,获取缓存
 * @param {String} getFile 
 * @returns {Array}
 */
function requireNodePath( getFile ){
    const file1 = require(getFile)

    
    let R_results = {}
    
    let results;
    results = Object.keys(require.cache)

    results.forEach(x => {
        if(x.indexOf('/node_modules') >= 0){
            return 
        }
        let children = require.cache[x].children;
        if (children.length > 0){
            R_results[x] = children.map(child => path.relative(path.dirname(x), child.filename))
        }
    })
    
    return R_results
}

module.exports = {
    requireNodePath
}