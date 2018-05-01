 ## javascript 模块结构描述

<p align="center"><a href="https://npmjs.com/package/nodepaths"><img src="https://img.shields.io/npm/v/nodepaths.svg?style=for-the-badge" alt="NPM version"></a> 
<img src="https://img.shields.io/npm/dm/peco.svg?style=for-the-badge" alt="NPM downloads"></a></p>

基于 匹配 这两种模式 
``` js
import React, {Component} from 'react'; // > react

const path = require('path') // > path
```

## 使用

```
npm install -g nodepaths
```
>运行

```
nodepaths [filename]/[Directory] -O [输出目录]
```

### 生成一个

在命令运行路径下

```
process.cwd()+NodePathdata.json
```

与 ``git`` 版本控制搭配 可观察模块变动。

## 有关思考过程可以查看 

[Doc](https://github.com/chinanf-boy/NodePath/tree/master/Doc)

## Dev

> 运行

```
node NodePath/index.js demo/test1
```
