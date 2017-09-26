
const isRquire = (match) => match.indexOf('require') >= 0
? true
: false
const getFileName = (matchs) => {
    return matchs
        ? matchs.map(x => {
            if (isRquire(x)) {
                return x.slice(9, -2)
            } else {
                let localx = x
                    .split(' ')
                    .filter(x => x != 'from' && x).join('')
                return localx.slice(1, localx.length - 1)
            }
        })
        : false
}

console.log(getFileName(["require('path')","from 'path'"]))