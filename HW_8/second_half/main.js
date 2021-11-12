'use strict'

function inherit(ParentClass){
    function ChildClass(){}

    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
    ChildClass.prototype._super = ParentClass.prototype;

    return ChildClass;
}

function Trees(){}
Trees.prototype.init = function(name){
    this.name = name;
};
Trees.prototype.print = function(){
    console.log(this.name);
};

let typeTree = inherit(Trees);
typeTree.prototype.initTree = function(type){
    type = "This tree is " + type;
    this._super.init.call(this, type);
}

let treeName = inherit(typeTree);
treeName.prototype.initName= function(name){
    name = "Name of the tree is " + name;
    this._super.init.call(this, name);
} 

let conifer = new typeTree();
conifer.initTree('conifer');

let pine = new treeName();
pine.initName('pine');

conifer.print();
pine.print();
  



