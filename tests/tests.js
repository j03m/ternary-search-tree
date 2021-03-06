var Tree = require("../src/index.js");
var assert = require("assert");
describe("add function", function () {

    it("should create a properly formed tree when strings are added", function () {
        var tree = new Tree();
        tree.add("ABBA");
        assert(tree.root.ch === "a");
        assert(tree.root.left === undefined);
        assert(tree.root.right === undefined);
        assert(tree.root.center !== undefined);
        assert(tree.root.center.ch === "b");

        var node = tree.root.center;
        assert(node.left === undefined);
        assert(node.right === undefined);
        assert(node.center !== undefined);
        assert(node.center.ch === "b");

        node = node.center;
        assert(node.center !== undefined);
        assert(node.center.ch === "a");
        assert(node.center.isEnd === true);
        assert(node.left === undefined);
        assert(node.right === undefined);

    });

    it("should branch to other trees when non matching strings are added", function () {
        var tree = new Tree();
        tree.add("ABBA");
        tree.add("ACCA");
        assert(tree.root.ch === "a");
        assert(tree.root.left === undefined);
        assert(tree.root.right === undefined);
        assert(tree.root.center !== undefined);
        assert(tree.root.center.ch === "b");
        assert(tree.root.center.center.ch === "b");
        assert(tree.root.center.center.center.ch === "a");
        assert(tree.root.center.right.ch === "c");
        assert(tree.root.center.right.center.ch === "c");
        assert(tree.root.center.right.center.center.ch === "a");

    });

    it("should apply a data package to end nodes when data is supplied", function () {
        var tree = new Tree();
        tree.add("ABBA", 1);
        tree.add("ACCA", 2);
        assert(tree.root.data === undefined);
        assert(tree.root.center.data === undefined);
        assert(tree.root.center.center.data === undefined);
        assert(tree.root.center.center.center.data[0] === 1);
        assert(tree.root.center.right.data === undefined);
        assert(tree.root.center.right.center.data === undefined);
        assert(tree.root.center.right.center.center.data[0] === 2);

    });

    it("should set isEnd for end nodes", function () {
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

    it("should search out strings and return a list of end nodes with data for matches", function () {
        var tree = new Tree();
        tree.add("ABBA", 1);
        tree.add("ACCA", 2);
        var result = tree.search("AB");
        assert(result.length === 1);
        assert(result[0].data[0] === 1);

        var result = tree.search("AC");
        assert(result.length === 1);
        assert(result[0].data[0] === 2);

    });

    it("should not find nodes where there are no nodes to be found", function () {
        var tree = new Tree();
        tree.add("ABBA", 1);
        tree.add("ACCA", 2);
        var result = tree.search("CX");
        assert(result.length === 0);;

        var result = tree.search("ZA");
        assert(result.length === 0);

    });

    it("should be case sensitive only if supply a bool true to the constructor", function () {
        var tree = new Tree(true);
        tree.add("ABBA", 1);
        tree.add("abba", 2);
        tree.add("ACCA", 3);

        var result = tree.search("ab");
        assert(result.length === 1);
        assert(result[0].data.length === 1);
        assert(result[0].data[0] === 2);

        var result = tree.search("ac");
        assert(result.length === 0);

        var tree2 = new Tree();
        tree2.add("ABBA", 1);
        tree2.add("abba", 2);
        tree2.add("ACCA", 3);

        result = tree2.search("ab");
        assert(result.length === 1);

        assert(result[0].data.length === 2);
        assert(result[0].data[0] === 1);
        assert(result[0].data[1] === 2);

        var result = tree2.search("ac");
        assert(result.length === 1);

    });


    it("should only collect final nodes that pass a supplied matching function when one is supplied", function () {
        var tree = new Tree(false);
        tree.add("ABBA", 1);
        tree.add("abba", 2);
        tree.add("ACCA", 3);
        tree.add("DCCA", 20);
        tree.add("DCCB", 11);
        tree.add("DCCC", 22);

        var result = tree.search("ab", function(data){
            return data > 14;
        });
        assert(result.length === 0);

        result = tree.search("ab");
        assert(result[0].data.length === 2);

        result = tree.search("D", function(data){
            return data > 15;
        });
        assert(result.length === 2);
        assert(result[0].data[0] === 20);
        assert(result[1].data[0] === 22);

    });

    it("should hanlde a full match", function(){
        var tree = new Tree(false);
        tree.add("ABBA", 1);
        var nodes = tree.search("ABBA");
        assert(nodes.length === 1);
    });

    it("should update data references on multiple nodes", function(){
        var tree = new Tree(false);
        tree.add("ABBA", {found:1});
        tree.add("ABBA", {found:2});
        tree.add("ABBA", {found:3});
        var nodes = tree.search("ABBA");
        assert(nodes.length ===1 );
        assert(nodes[0].data.length === 3);
    });

    it("should have the word stored in end nodes", function(){
        var tree = new Tree(false);
        tree.add("ABBA", {found:1});
        tree.add("ABBC", {found:2});
        tree.add("ACBA", {found:3});
        var nodes = tree.search("AB");
        assert(nodes.length ===2 );
        assert(nodes[0].word === "ABBA");
        assert(nodes[1].word === "ABBC");
    });

    it("should handle long strings and punctuation", function () {
        var obj = [{
            line_id: 1,
            line_number: '',
            play_name: 'Henry IV',
            speaker: '',
            speech_number: '',
            text_entry: 'ACT I'
        },
            {
                line_id: 2,
                line_number: '',
                play_name: 'Henry IV',
                speaker: '',
                speech_number: '',
                text_entry: 'SCENE I. London. The palace.'
            },
            {
                line_id: 3,
                line_number: '',
                play_name: 'Henry IV',
                speaker: '',
                speech_number: '',
                text_entry: 'Enter KING HENRY, LORD JOHN OF LANCASTER, the EARL of WESTMORELAND, SIR WALTER BLUNT, and others'
            }
        ];

        var tree = new Tree();
        for (var i = 0; i < obj.length; i++) {
            tree.add(obj[i].text_entry, obj[i].line_id);
        }

        var result = tree.search("Enter");
        assert(result.length === 1);
        assert(result[0].data[0] === 3);
    });
});