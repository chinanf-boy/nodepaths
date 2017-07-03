# 实现

> node

---

### 目录

* test
  * test2.js
* * test3.js
* test1.js
* path1.js
* filepath.js

> 以下 代码默认是 **filepath.js**文件

## 路径

node 中 `__dirname  代表 文件-绝对目录`

```js
console.log(__dirname)
```

因为，文件引用的文件代码，使用的相对目录，这就需要，我们在查阅代码，有一个**文件目录位置**的**变量**

```js
const main = function( dirname, filename){
// dirname 就是那个变量
// do something 
// .            穷尽
// .            条件
// main( fileDirName, newFileName )
// 递归 
}

main( __dirname, 'test1.js')
```

### 条件

* [x] #### 引用正则查询

代码总要先找到

[可视化正则式](http://refiddle.com/) 网址

函数

```js
const getMatch = (data) => data.match(/(require|from)([(\s]+)?(\'|\")[\S]+((\'|\")([\)])?)/g);
```

为了找出像

* test1.js

```js
const floder = require('./test/test3')
//require('./test/test3')

const path = require('./path1')
//require('./path1')
```

* 其他.js 

> Es5 的语法

```js
import test from './test.js'
// from './test.js'
```

* [x] #### 文件

为了打开文件

```js
const fs = require('fs')
// node 文件函数

fs.readFile('test1.js', 'utf8', (err, data) => {
        if (err) 
            throw err;
        // 
        console.log(data);

    });
```

`data` 变量 字符串类型

```markdown
const floder = require('./test/test3')

const path = require('path1')
```

* [x] #### 后缀名

```js
const EndJs = (match) =>match.slice(match.length-2, match.length) === 'js'
// 只实现了 js 文件
```

不单单如此，因为

```js
var filename = 'test1.js'
// 需要 后缀名，不然错误

fs.readFile(filename, 'utf8', (err, data) => {
        if (err) 
            throw err;
        // 
        console.log(data);

    });
```

* [x] #### 获取目录与文件名

```js
const path = require('path')
// 引用


const getDirName = (Path) =>path.dirname(Path)
// 同等于 __dirname 

const getBaseName = (Path) =>path.basename(Path)


// 需要注意的是
// 获得的 绝对目录最好一位
// 并不是 / 符号
// /Desktop/JSJSJSJSJSJJSJS/TestDataPath   ⬅️

getDirName('/Desktop/JSJSJSJSJSJJSJS/TestDataPath/test1.js')
// /Desktop/JSJSJSJSJSJJSJS/TestDataPath

getBaseName('/Desktop/JSJSJSJSJSJJSJS/TestDataPath/test1.js')
// test1.js
```

* [x] #### 获取引用文件名

当我们查询到，`require` 或 `from` 后

需要，获取

```js
const path = require('path')
// path
const test = require('./test1.js')
// ./test1.js
import test from './test1.js'
// ./test1.js
```

经过，**引用正则查询** 的 `match` 函数，获得一个符合的 数组

```js
Array(2) ["require('./test/test3')", "require('path1')"]
// ./test/test3   path1
```

这节，要做的

```js
const getFileName = (matchs) => {
    return matchs.map(x => {
        if (isRquire(x)) {
            return x.slice(9, x.length - 2)
        } else {
            let localx = x.split(' ').filter(x =>x!='from'&&x)
            return localx.slice(1,localx.length-1)
        }
    })
}

// 分 es5语法和 require
```

* [x] #### 数据结构

我认为，中间数据结构

```js
{
'/Desktop/JSJSJSJSJSJJSJS/TestDataPath/test1.js': ['./test/test3','path1']
// 绝对文件路径 + 文件内引用模块
}
```

所以，创建一个

```js
let LocalStore = {
    'host': __dirname
}
let filePath = '/Desktop/JSJSJSJSJSJJSJS/TestDataPath/test1.js'
let matchs = ['./test/test3','path1']

LocalStore[filePath] = matchs;
```

* [ ] #### 可视化的

如何把

```js
{
'/Desktop/JSJSJSJSJSJJSJS/TestDataPath/test1.js': ['./test/test3','path1']
// 绝对文件路径 + 文件内引用模块
}
```

变成看起来不错的样子，图？？，html文件？？

此节未完

* [x] #### 与Git运用

用版本控制工具之类，在完成代码革新后，filepath完成结构描述工作，

可以通过，两个版本，结构描述文件的改动来清晰代码思维

* [x] #### 主函数异步数据获得

因为，为了函数运行完成后得到的数据

采用了，`async` `await` 的异步语法

```js
const NodePath = async function (dirhost, filename) {
    let filePath = dirhost + '/' + filename;

    await fs.readFile(filePath, 'utf8', (err, data) => {
        if (err)
            throw err;
        let matchs = getMatch(data)
        let filematchs = getFileName(matchs)
        if (filematchs) {
            LocalStore[filePath] = filematchs;

            filematchs.forEach(x => {

                if (isEndJs(x) && isLocalFunc(x)) {
                    NodePath(getDirName(filePath), x)
                } else if (isLocalFunc(x)) {
                    NodePath(getDirName(filePath), x + '.js')
                }

            })
        }

    });
}
NodePath(__dirname, 'test1.js').then(() =>{console.log(LocalStore)})

```



