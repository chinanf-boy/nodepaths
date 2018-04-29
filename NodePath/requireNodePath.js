const path = require('path')
const globby = require('globby');
const readFile = require('./readFile')
const matchModule = require('./match-module')

const NODE_MODULES = 'node_modules'
const NATIVE_ERROR = 'native lib'
/**
 * @description 从文件中-require,获取缓存
 * @param {String} getFile 
 * @returns {Array}
 */
async function requireNodePath( filePath ){
    

    let R_results = {}

    async function Around(fileP){

        if(fileP.indexOf(NODE_MODULES) >= 0) return
        

        let matchs = true

        if(matchs){
        
            const fileData = await readFile(fileP).catch(err =>console.error(err))
            
            matchs = matchModule(fileData)
            
            R_results[fileP] = []

            for(let i in matchs){

                let m = getF(matchs[i]) // get ('Filename')

                R_results[fileP].push(m)
                let AbsPath = path.resolve(path.dirname(fileP), m) // Add Abs-Parent-Path
                try {

                    if(!hasLocal(m))throw new Error(NATIVE_ERROR)

                    AbsPath = require.resolve(AbsPath)
                    
                }catch(err){
                    let AbsPathFile = null
                    // globby 查询有没有相关文件
                    if(err.message !== NATIVE_ERROR){      
                        AbsPathFile = await globby(AbsPath+'.*').catch(err =>{
                        console.error(err)
                        })
                    }
                    if(AbsPathFile !== null){
                        AbsPath =  AbsPathFile[0]
                    }else{
                        AbsPath =  NODE_MODULES
                    }

                }
                
                await Around(AbsPath)


                matchs[i] = null
            }

            matchs.filter(x => x).length == 0 && (matchs = null)
        }

        if(matchs)console.error(fileP, "Error ->", matchs)

    }

    await Around(filePath)
    
    return R_results
}


const getF = (str) =>{
    // const path = require('path')
    if(str.indexOf('require') >= 0){
        return str.slice(9, -2)
    }
    // import vue from 'vue'
    return str.split(' ').filter(x => x && x!='from').join().slice(1, -1)
}

const hasLocal = (str) =>{
    return str.indexOf('.') >= 0
}

module.exports = {
    requireNodePath
}