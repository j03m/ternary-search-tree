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
        assert(tree.root.center.center.center.data === 1);
        assert(tree.root.center.right.data === undefined);
        assert(tree.root.center.right.center.data === undefined);
        assert(tree.root.center.right.center.center.data === 2);

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
        assert(result[0].data === 1);

        var result = tree.search("AC");
        assert(result.length === 1);
        assert(result[0].data === 2);

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
        assert(result[0].data === 3);
    });
});