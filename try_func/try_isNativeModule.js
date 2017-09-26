
const builtinLibs = [
    'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'crypto',
    'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'net',
    'os', 'path', 'perf_hooks', 'punycode', 'querystring', 'readline', 'repl',
    'stream', 'string_decoder', 'tls', 'tty', 'url', 'util', 'v8', 'vm', 'zlib','http2'
  ];
const isEndJs = (match) => match.slice(match.length - 3, match.length) === '.js'

const isNativeModule = (filename) => {
    let result = false;
    if(isEndJs(filename)){
        for (let i=0;i<builtinLibs.length;i++){
            if(filename === builtinLibs[i]+'.js'){

                result = true
                break
            }
        }
    }
    else{
        for (let i=0;i<builtinLibs.length;i++){
            if(filename === builtinLibs[i]){
                result = true
                break
            }
        }
    }
    return result
}

console.log(isNativeModule('path.js'))
console.log(isNativeModule('./path'))
console.log(isNativeModule('path1'))