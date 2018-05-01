const fl = require('node-filelist');
const requireNodePath= require('./requireNodePath')
const isDirectory = require('is-directory');
const NODE_MODULES = '/node_modules'

async function getAllFiles(files, fileOption){
	return new Promise((ok,Err)=>{
		try{
			fl.read(files, fileOption , function (results){
				ok(results)
			});
		}catch(err){
			Err(err)
		}
	})
}


function isDirectoryP(fP){
    return new Promise((ok, Err) =>{
        isDirectory(fP, function(err, dir) {
            if (err) Err(err);
            ok(dir);
          });
    })
}

async function nodePath(filePath){

    let results = {}

    if(isDirectoryP(filePath)){ // filePath is Directory 

        const files   = [ filePath ];
        const fileOption  = { "ext" : "js|jsx|ts|vue" };

        let Files = await getAllFiles(files, fileOption)

        Files = Files.map(F =>F.path).filter(x => !x.includes(NODE_MODULES))
    
        for(let i in Files){
            results = Object.assign(results, await requireNodePath(Files[i]))
        }
    
        return results

    }else{

        return await requireNodePath(filePath)
    }

}

module.exports = nodePath