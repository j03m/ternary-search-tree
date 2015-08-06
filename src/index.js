var Tree = function () {
    this.root = null;
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

    if (str[pos] < node.ch) {
        this.setLeft(node, str[pos]);
        this.innerAdd(str, pos, node, data);
    } else if (str[pos] > node.ch) {
        this.setRight(node, str[pos]);
        this.innerAdd(str, pos, node.right, data);
    } else if (str[pos + 1] === undefined) {
        node.isEnd = true;
        node.data = data;
    } else {
        this.setCenter(node, str[pos+1]);
        this.innerAdd(str, pos+1, node.center, data);
    }
};

Tree.prototype.setLeft = function(node, ch){
    node.left = node.left ? node.left : this.createNode(ch);
};

Tree.prototype.setRight = function(node, ch){
    node.right = node.right ? node.right : this.createNode(ch);
};

Tree.prototype.setCenter = function(node, ch){
    node.center = node.center ? node.center : this.createNode(ch);
};




Tree.prototype.createNode = function(ch){
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
