# fileNodePath 关注模块链路图

```js
const path = require('path')
```
内置函数

### 目录

* `test`
  * `test2.js`
* * `test3.js`
* `test1.js`
* `path1.js`

_一样_

```js
const test = require(./test1.js)
```

> 例子-------- 以下都是 文件名是**绝对路径，代码是相对路径**

* test1.js

```js
const floder = require('./test/test3')

const path = require('path1')

path()
floder()
```

* /test/test3.js

```js
const test2 =  require('./test2.js')
const path = require('path')
module.exports =  test2
```

* /test/test2.js

```js
const f1 = () =>{
    console.log('22222222')
}
const path = require('path')

module.exports =  f1
```

那么模块链路，看起来就像

``` js
node NodePath.js
```

### test1 &lt;-----  /test/test3 &lt;------- /test/test2 &lt;-------- path

NodePathdata.json
``` json
{
	"host": "/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS/NodePath",
	"/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS/NodePath/test1.js": [
		"./test/test3",
		"path1"
	],
	"/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS/NodePath/./test/test3.js": [
		"./test2.js"
	]
}
```

| 文件 | 引用模块及文件 |
| :--- | :--- |
| test1 | /test/test3 , path1|
| /test/test3 | /test/test2 |
| /test/test2 | path |

一般 ``path`` 内置函数不会再深入


