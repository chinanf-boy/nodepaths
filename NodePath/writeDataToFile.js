const fs = require('fs')
/**
 * @description 写书籍 进入 NodePathdata.json
 * @param {string} data 
 */
const writeDataToFile = (data) => {
    data = JSON.stringify(data, null, '\t')
    fs.writeFile('NodePathdata.json', data, (err) => {
        if (err) 
            throw err;
        console.log('The NodePathdata.json has been saved!','\n -->> ',process.cwd()+'/NodePathdata.json');
    });
}

module.exports = {
    writeDataToFile
}