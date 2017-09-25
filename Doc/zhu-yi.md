# 注意

> **Node 服务端 javascript 实现 v8**

---

✅ 正确

```js
const path = require('path')
//node内置函数
const path1 = require('./path1')
//下面目录path.js文件
```

❌ 错误

```js
const path = require('path1')
// 抛出错误❌
// 可以看出，当没有路径符号 . / 之类
// 查询，是在 内置函数目录

// 那么，我们就可以认为，没有路径符号，不需要看文件

// 而我们并不希望，把内置函数的，调用显示
// 引用到，内置函数 path 就应该停止
```

* test
  * test2.js
  * test3.js
* test1.js
* path1.js

### 没有引用模块

需要，判定

```js
if (filematchs) {
//...
}
```

### 文件的打开是异步

需要使用，`async` 的异步语法，方便



