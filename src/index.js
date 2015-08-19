/*
 * Inspired by: http://igoro.com/archive/efficient-auto-complete-with-a-ternary-search-tree/
 * */


var Tree = function (caseSensitive) {
    this.root = undefined;
    this.caseSensitive = Boolean(caseSensitive);
}

Tree.prototype.add = function (str, data) {
    if (typeof str !== "string") {
        throw new Error("Add only accepts strings.");
    }

    if (this.root === undefined){
        this.root = this.createNode(str[0]);
    }
    this.innerAdd(str, 0, this.root, data);
};

Tree.prototype.innerAdd = function (str, pos, node, data) {
    var compare = str[pos];
    var compareNext = str[pos + 1];

    if (!this.caseSensitive){
        compare = compare.toLowerCase();
        if (compareNext!==undefined){
            compareNext = compareNext.toLowerCase();
        }
    }
    if (compare < node.ch) {
        node = this.setLeft(node, compare);
        this.innerAdd(str, pos, node, data);
    } else if (compare > node.ch) {
        node = this.setRight(node, compare);
        this.innerAdd(str, pos, node, data);
    } else if (compareNext === undefined) {
        node.isEnd = true;
        if (node.data === undefined){
            node.data = [];
        }
        node.data.push(data);
    } else {
        node = this.setCenter(node, compareNext);
        this.innerAdd(str, pos+1, node, data);
    }
};

Tree.prototype.setLeft = function(node, ch){
    if (node.left===undefined) { node.left = this.createNode(ch); }
    return node.left;
};

Tree.prototype.setRight = function(node, ch){
    if (node.right===undefined) { node.right = this.createNode(ch); }
    return node.right;
};

Tree.prototype.setCenter = function(node, ch){
    if (node.center===undefined) { node.center = this.createNode(ch); }
    return node.center;
};


Tree.prototype.search = function(str, matcher) {
    if (typeof str !== "string") {
        throw new Error("Type string required for search.");
    }

    if (this.root === undefined) {
        throw new Error("Tree not initiliazed, root is undefined. Call add before searching.");
    }

    var endNodes = [];
    var that = this;
    this.traverse(this.root, str, 0, function(node, str, pos, parent){
        if(pos === str.length){
            if (node!==undefined){
                that.collectEndNodes(node, endNodes, matcher);
            }else{
                that.collectEndNodes(parent, endNodes, matcher); //exact matches require access to 1 level up
            }
        }
    });
    return endNodes;
}

Tree.prototype.traverse = function(node, str, pos, fn){
    while(node !== undefined) {
        var currentChar = str[pos];
        var currentNode = node;
        if (!this.caseSensitive && currentChar!==undefined){
            currentChar = currentChar.toLowerCase();
        }
        if (currentChar < node.ch){
            node = node.left;
        }else if (currentChar > node.ch){
            node = node.right;
        }else{
            node = node.center;
            pos++;
        }

        fn(node, str, pos, currentNode);
    }
};

Tree.prototype.collectEndNodes = function(node, endNodes, matcher){
    if (endNodes === undefined){
        endNodes = [];
    }
    if(node !== undefined) {
        if (node.isEnd){
            if (matcher === undefined){
                endNodes.push(node);
            }else if (matcher(node.data)){
                endNodes.push(node);
            }
        }
        this.collectEndNodes(node.left, endNodes, matcher);
        this.collectEndNodes(node.right, endNodes, matcher);
        this.collectEndNodes(node.center, endNodes, matcher);
    }
};

Tree.prototype.createNode = function(ch){
    if (!this.caseSensitive){
        ch = ch.toLowerCase();
    }
    return new TreeNode(ch);
};

var TreeNode = function (ch) {
    this.ch = ch;
    this.isEnd = false;
};

//node
if (module && module.exports){
    module.exports = Tree;
}
