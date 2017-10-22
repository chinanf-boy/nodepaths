const path = require('path')
function requireNodePath( getFile ){
    const file1 = require(getFile)
    
    // console.log(require.cache);
    
    let R_results = {}
    
    let results;
    results = Object.keys(require.cache)
    // .filter(x => 
    //         {
    //             return !missDir.find(value => value === x)
    //         }
    //     )
                
    // console.log(results)

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