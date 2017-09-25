 ## javascript 模块结构描述

基于 匹配 这两种模式
``` js
import React, {Component} from 'react';

const path = require('path')
```

## 使用

```
node NodePath.js filename
```
仅限 ``js``后缀 文件

生成一个

```
NodePathdata.json
```

与 ``git`` 版本控制搭配 可看 模块变动。

## 有关思考过程可以查看 Doc

## 可以 clone 库

> 运行

```
node NodePath.js test1
```

## 未来新增

- 系统命令行直接调用
- 相关BUg 自我修复和发现：P