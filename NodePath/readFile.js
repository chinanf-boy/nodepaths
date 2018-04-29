const fs = require("mz/fs");

/**
 * @description 读文件内容
 * @param {String} filepath 
 */
async function readFile(filepath) {
  return await fs.readFile(filepath,'utf8');
}

module.exports = readFile