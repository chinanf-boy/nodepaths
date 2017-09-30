const requireNodePath = require('./requireNodePath')

const fromNodePath = require('./fromNodePath')

const getMatch = (data) => data.match(/(require|from)([(\s]+)?(\'|\")[\S]+((\'|\")([\)])?)/g);


// 获得参数
let getFile = process.argv[2]
if(!getFile){
    throw Error("there is no index file\nlike:\n"+">node NodePath.js filename.js\n")
}
let hostdir = process.argv[1]