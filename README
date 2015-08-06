# Ternary prefix search tree

Inspired by the c# implementation here: Inspired by: http://igoro.com/archive/efficient-auto-complete-with-a-ternary-search-tree/

Pure javascript implementation that allows for loading strings into the tree and then quickly searching out a given prefix. 

## Simple Bench:

```
clone
npm install
cd src
node --expose-gc bench.js
```
bench.js will load the entire works of Shakespear (will.json), index it into the tree and then perform a prefix search. Search should results complete in 1ms.

*Note: expose-gc only needed for the bench mark script, code is portable to node, web and rplus


## Running tests:

```
gulp test
```

## API Sample:

```javascript
var util = require("util");
var fs = require("fs")
var Tree = require("./index.js");

console.log("Start mem:", util.inspect(process.memoryUsage()));

fs.readFile("../will.json", function(err, data){
    var obj = JSON.parse(data);

    var heapTotalStart = process.memoryUsage().heapUsed;
    var tree = new Tree();
    console.log("length:", obj.length);

    for(var i=0;i<obj.length;i++){
        process.stdout.write(".");
        if (typeof obj[i].text_entry === "string"){
            tree.add(obj[i].text_entry, {name:obj[i].play_name, id:obj[i].line_id});
        }else{
            throw new Error(typeof obj[i].text_entry);
        }
    }
    data = undefined;
    obj = undefined;
    gc();

    var heapTotalEnd = process.memoryUsage().heapUsed;

    //search some stuff
    var start = Date.now();
    var nodes = tree.search("Be that thou hopest");
    var end = Date.now();

    console.log("found: ", nodes, "\nin:", end-start, "ms. Incremental heap:", heapTotalEnd - heapTotalStart);

});

```

See /tests for additional details.



