const path = require('path')
const readline = require('readline')

const Ms = [
    /(require\()(\'|\")[\S]+((\'|\")([\)])+)/g,
    // /( from)([\s]+)(\'|\")[\S]+((\'|\")([^\S])?([;])?)/g
    /( from)([\s]+)(\'|\")+[\S]+((\'|\")+([^\S;])?)/g
]

/**
 * @description 匹配-库
 * @param {any} fileData 
 */
function matchModule( fileData ){

    let matchName = []
    let fDs = fileData.split('\n')
    
    fDs.forEach(data =>{

       data && Ms.forEach(m =>{
        data.match(m) && (matchName = matchName.concat(data.match(m)))
       })
    })
    

    return matchName
}

module.exports = matchModule