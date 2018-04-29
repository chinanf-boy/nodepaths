const path = require('path')
const readline = require('readline')

const Ms = [
    /^const/g
]

/**
 * @description 匹配-库
 * @param {any} fileData 
 */
function matchModule( fileData ){

    let matchName = []
    let fDs = fileData.split('\n')
    Ms.forEach(m =>{
        fDs.forEach(data =>{
            matchName.concat(m.exec(data))
        })

    })
    console.log(matchName)

    return matchName
}

module.exports = matchModule