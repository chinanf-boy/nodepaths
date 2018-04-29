let OutputPath = process.cwd()

function setO(data){
    OutputPath = data
}

function getO(){
    return OutputPath
}

module.exports = { setO, getO}