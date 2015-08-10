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
            tree.add(obj[i].text_entry, {name:obj[i].play_name, id:obj[i].line_id, val:obj[i].text_entry});
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

    console.log("found: ", nodes.length, "\nin:", end-start, "ms. Incremental heap:", heapTotalEnd - heapTotalStart);

    start = Date.now();
    nodes = tree.search("But so ");
    end = Date.now();

    console.log("2nd search found: ", nodes.length, "\nin:", end-start, "ms. Incremental heap:", heapTotalEnd - heapTotalStart);

    start = Date.now();
    nodes = tree.search("A");
    var x=0;
    var ary=[];
    end = Date.now();

    console.log("3nd search found: ", nodes.length, "\nin:", end-start, "ms. Incremental heap:", heapTotalEnd - heapTotalStart);


});