const ora = require('ora')
let Ora
let OutputPath = process.cwd()

function setO(data) {
    OutputPath = data
}

function getO() {
    return OutputPath
}

function loggerStart(str) {
    Ora = ora(str)
    Ora.start()
}

function loggerStop(ok, err) {
    if(!Ora) return
    if (err) {
        Ora.fail(err)
    }else if(ok){
        Ora.succeed(ok)
    }
    Ora = null
}

function loggerState(str, color = "green") {
    if (Ora) {
        Ora.text = str
        Ora.color = color
    }
}

module.exports = {
    setO,
    getO,
    loggerStart,
    loggerStop,
    loggerState
}