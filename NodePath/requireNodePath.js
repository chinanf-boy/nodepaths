// let getFile = process.argv[2]

// if(!getFile){
//     throw Error("there is no index file\nlike:\n"+">node NodePath.js filename.js\n")
// }



// let hostdir = process.argv[1]

function requireCache( hostdir, getFile ){
    const file1 = require(getFile)
    
    console.time('NodePath:time')
    
    // console.log(require.cache);
    
    let R_results = {}
    
    let results = Object.keys(require.cache).filter(x => x!==hostdir)
    
    // console.log(results)
    
    results.forEach(x => {
        let children = require.cache[x].children;
        if (children.length > 0){
            R_results[x] = children.map(x => x.filename);
        }
    })
    
    console.log(R_results)
    console.timeEnd('NodePath:time')
}

exports.requireCache = requireCache