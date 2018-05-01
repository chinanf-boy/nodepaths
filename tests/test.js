import test from 'ava';
import path from 'path';

import NodePaths from '../NodePath/nodePaths'

test.serial('require_nodepath single file',async t => {

    const result = await NodePaths(path.resolve(__dirname, "../demo/test1.js"))

    t.is(Object.keys(result).length, 4)
});

test.serial('require_nodepath directory ',async t => {

    const result = await NodePaths(path.resolve(__dirname, "../demo/"))

    t.is(Object.keys(result).length, 5)
});