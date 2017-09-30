function requireNodePath( getFile, missDir ){
    const file1 = require(getFile)
    
    // console.log(require.cache);
    
    let R_results = {}
    
    let results;
    results = Object.keys(require.cache).filter(x => 
            {
                return !missDir.find(value => value === x)
            }
        )
                
    // console.log(results)
    
    results.forEach(x => {
        let children = require.cache[x].children;
        if (children.length > 0){
            R_results[x] = children.map(x => x.filename);
        }
    })
    
    return R_results
}

module.exports = {
    requireNodePath
}