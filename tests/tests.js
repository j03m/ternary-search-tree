var Tree = require("../src/index.js");
var assert = require("assert");
describe("add function", function () {

    it("should create a properly formed tree when strings are added", function () {
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

    it("should branch to other trees when non matching strings are added", function () {
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