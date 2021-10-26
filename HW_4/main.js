function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
}

function BinaryTree(){
    this.root = null;
}

BinaryTree.prototype.add = function(value) {
    const newNode = new Node(value);
    if(!this.root){
        this.root = newNode;
        return;
    } else {
        if(typeof(this.root.value) == typeof(value) && value !== null && value !== ""){
            this.insert(this.root, newNode);
        } else {
            console.log(`${value} is not a ${typeof(this.root.value)} or is null, empty value or undefined`);
        }
    }  
    return this;
}

BinaryTree.prototype.insert = function(currentNode, newNode){
    let traverse = function (node){
        if(newNode.value > node.value){
            if(!node.right){
                node.right = newNode;
                return;
            } else traverse(node.right);
        } else if (newNode.value < node.value){
            if(!node.left){
                node.left= newNode;
                return;
            } else traverse(node.left);
        }
    };
    traverse(currentNode);
}

BinaryTree.prototype.PrintTree = function (){
    const nodes =[];
    let rootNode = this.root;
    let traverse = function(rootNode){
        if (rootNode){
            nodes.push(rootNode.value);
            rootNode.left && traverse(rootNode.left);
            rootNode.right && traverse(rootNode.right);
        }  
    };
    traverse(rootNode);
    return nodes;
}

const myTree = new BinaryTree();

myTree.add(8);
myTree.add('ggg');
myTree.add(9);
myTree.add();
myTree.add(null);
myTree.add("");
myTree.add(20);
myTree.add(6);
myTree.add(2);
myTree.add(11);

console.log(myTree);
console.log(myTree.PrintTree());