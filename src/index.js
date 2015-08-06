/*
 * Inspired by: http://igoro.com/archive/efficient-auto-complete-with-a-ternary-search-tree/
 * */


var Tree = function (caseSensitive) {
    this.root = null;
    this.caseSensitive = Boolean(caseSensitive);
}

Tree.prototype.add = function (str, data) {
    if (typeof str !== "string") {
        throw new Error("Add only accepts strings.");
    }

    if (this.root === null){
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
    if (node.left===null) { node.left = this.createNode(ch); }
    return node.left;
};

Tree.prototype.setRight = function(node, ch){
    if (node.right===null) { node.right = this.createNode(ch); }
    return node.right;
};

Tree.prototype.setCenter = function(node, ch){
    if (node.center===null) { node.center = this.createNode(ch); }
    return node.center;
};


Tree.prototype.search = function(str) {
    if (typeof str !== "string") {
        throw new Error("Type string required for search.");
    }

    if (this.root === null) {
        throw new Error("Tree not initiliazed, root is null. Call add before searching.");
    }

    var endNodes = [];
    var collection = this.collectEndNodes.bind(this);
    this.traverse(this.root, str, 0, function(node, str, pos){
        if(pos === str.length){
            if (node!==null){
                collection(node, endNodes);
            }
        }
    });
    return endNodes;
}

Tree.prototype.traverse = function(node, str, pos, fn){
    while(node !== null) {
        var currentChar = str[pos];
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

        fn(node, str, pos);
    }
};

Tree.prototype.collectEndNodes = function(node, endNodes){
    if (endNodes === undefined || endNodes === null){
        endNodes = [];
    }
    if(node !== null && node !== undefined) {
        if (node.isEnd){
            endNodes.push(node);
        }
        this.collectEndNodes(node.left, endNodes);
        this.collectEndNodes(node.right, endNodes);
        this.collectEndNodes(node.center, endNodes);
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
    this.left = null;
    this.center = null;
    this.right = null;
};

//node
if (module && module.exports){
    module.exports = Tree;
}
