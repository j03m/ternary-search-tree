var Tree = require("../src/index.js");
var assert = require("assert");
describe("add function", function(){

    it("should create a properly formed tree when strings are added", function(){
        var tree = new Tree();
        tree.add("ABBA");
        assert(tree.root.ch === "A");
        assert(tree.root.left === null);
        assert(tree.root.right === null);
        assert(tree.root.center !== null);
        assert(tree.root.center.ch === "B");

        var node = tree.root.center;
        assert(node.left === null);
        assert(node.right === null);
        assert(node.center !== null);
        assert(node.center.ch === "B");

        node = node.center;
        assert(node.center !== null);
        assert(node.center.ch === "A");
        assert(node.center.isEnd === true);
        assert(node.left === null);
        assert(node.right === null);

    });

    it("should branch to other trees when non matching strings are added", function(){
        var tree = new Tree();
        tree.add("ABBA");
        tree.add("ACCA");
        assert(tree.root.ch === "A");
        assert(tree.root.left === null);
        assert(tree.root.right === null);
        assert(tree.root.center !== undefined);
        assert(tree.root.center.ch === "B");
        assert(tree.root.center.center.ch === "B");
        assert(tree.root.center.center.center.ch === "A");
        assert(tree.root.center.right.ch === "C");
        assert(tree.root.center.right.center.ch === "C");
        assert(tree.root.center.right.center.center.ch === "A");

    });

    it("should apply a data package to end nodes when data is supplied", function(){
        var tree = new Tree();
        tree.add("ABBA", 1);
        tree.add("ACCA", 2);
        assert(tree.root.data === undefined);
        assert(tree.root.center.data === undefined);
        assert(tree.root.center.center.data === undefined);
        assert(tree.root.center.center.center.data === 1);
        assert(tree.root.center.right.data === undefined);
        assert(tree.root.center.right.center.data === undefined);
        assert(tree.root.center.right.center.center.data === 2);

    });

    it("should set isEnd for end nodes", function(){
        var tree = new Tree();
        tree.add("ABBA", 1);
        tree.add("ACCA", 2);
        assert(tree.root.isEnd === false);
        assert(tree.root.center.isEnd === false);
        assert(tree.root.center.center.isEnd === false);
        assert(tree.root.center.center.center.isEnd === true);
        assert(tree.root.center.right.isEnd === false);
        assert(tree.root.center.right.center.isEnd === false);
        assert(tree.root.center.right.center.center.isEnd === true);

    });

});