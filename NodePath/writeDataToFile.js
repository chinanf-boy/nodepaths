const fs = require('fs')
const path = require('path')

const { getO } = require('./work-options')
/**
 * @description 写书籍 进入 NodePathdata.json
 * @param {string} data 
 */
const writeDataToFile = (data) => {
    data = JSON.stringify(data, null, '\t')
    let O = getO()
    fs.writeFile(path.join(O, 'NodePathdata.json'), data, (err) => {
        if (err) 
            throw err;
        console.log('The NodePathdata.json has been saved!','\n -->> ',process.cwd()+'/NodePathdata.json');
    });
}

module.exports = {
    writeDataToFile
}