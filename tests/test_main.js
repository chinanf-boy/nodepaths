import test from 'ava';

import NodePath from '../NodePath/requireNodepath'

test('require_nodepath', t => {

    let R_result = NodePath.requireNodePath("/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS——project/NodePath/demo/test1.js", [
        "/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS——project/NodePath/NodePath/index.js", "/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS——project/NodePath/NodePath/requireNode" +
                "Path.js",
        "/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS——project/NodePath/NodePath/writeDataTo" +
                "File.js"
    ])

    let test_results = {
        "/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS——project/NodePath/demo/test1.js" : [
            "test/test3.js", "path1.js", "test2/index.js"
        ],
        "/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS——project/NodePath/demo/test/test3.js" : ["test2.js"],
        "/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS——project/NodePath/demo/test2/index.js" : ["test4.js"]
    }

    Object.keys(test_results).forEach(x => {
        t.deepEqual(R_result[x], test_results[x]);
    })
});