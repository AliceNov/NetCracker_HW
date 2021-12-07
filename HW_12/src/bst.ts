const outputField: HTMLElement | null = document.getElementById("BSTVisual");
const addButton: HTMLElement | null = document.getElementById("add");
const findButton: HTMLElement | null = document.getElementById("get");
const removeButton: HTMLElement | null = document.getElementById("remove");
const input: HTMLInputElement = document.getElementById("input") as HTMLInputElement;
const divArr: HTMLCollectionOf<Element> = document.getElementsByClassName("node");

class BSTNode<T> {
    private _data: T;
    private _right: BSTNode<T> | null;
    private _left: BSTNode<T> | null;
    public x: number;
    public y: number;

    constructor(_data: T, _right: BSTNode<T> | null, _left: BSTNode<T> | null, x: number, y: number){
        this._data = _data;
        this._left = null;
        this._right = null;
        this.x = x;
        this.y = y;
    }

    public get data(): T {
        return this._data;
    }
    public set data(value: T) {
        this._data = value;
    }
    public get right(): BSTNode<T> | null {
        return this._right;
    }
    public set right(value: BSTNode<T> | null) {
        this._right = value;
    }
    public get left(): BSTNode<T> | null {
        return this._left;
    }
    public set left(value: BSTNode<T> | null) {
        this._left = value;
    }
}

class BST<T>{
    public root: BSTNode<T> | null;

    constructor(){
        this.root = null;
    }

    public add(data: T): void{
        if (!this.root){
            this.root = new BSTNode<T>(data, null, null, 900, 3);
            const div: HTMLElement = document.createElement("div");
            div.className = "tree node";
            div.innerHTML = `${this.root.data}`;
            outputField?.appendChild(div);
            div.style.marginLeft = this.root.x + "px";
            return;
        }
        this.insert(data, this.root);
    }

    private insert(data: T, node: BSTNode<T>): void {
        if (data > node.data) {
            if (node.right !== null) {
                this.insert(data, node.right);
            } else {
                node.right = new BSTNode<T>(data, null, null, node.x + 100, node.y + 40);
                const div: HTMLElement = document.createElement("div");
                const divN: HTMLElement = document.createElement("div");
                div.className = "right node";
                divN.className = "voidN";
                div.innerHTML = `${data}`;
                div.style.marginLeft = node.right?.x + "px";
                div.style.marginTop = node.right?.y + "px";
                outputField?.appendChild(div);
            }
        } else if (data < node.data) {
            if (node.left !== null) {
                this.insert(data, node.left);
            } else {
                node.left = new BSTNode<T>(data, null, null, node.x - 100, node.y + 40);
                const div: HTMLElement = document.createElement("div");
                div.className = "left node";
                div.innerHTML = `${data}`;
                div.style.marginLeft = node.left?.x + "px";
                div.style.marginTop = node.left?.y + "px";
                outputField?.appendChild(div);
            }
        }
    }

    public delete(data: T): void{
        if (!this.root) {
            return;
        }

        this.root = this.remove(data, this.root);
    }

    private remove(data: T, node: BSTNode<T> | null): BSTNode<T> | null{
        if (!node) {
            return null;
        }

        if (data < node.data){
            node.left = this.remove(data, node.left);
        } else if (data > node.data){
            node.right = this.remove(data, node.right);
        } else {
            if (node.left !== null && node.right !== null){
                node.data = this.getMin(node.right);
                node.right = this.remove(node.data, node.right);
            } else if (!node.left){
               return node.right;
            } else if (!node.right){
                return node.left;
            } else {
               node = null;
            }
        }
        return node;
    }

    private getMin(node: BSTNode<T> | null): T {
        if (!node) {
            return null as any;
        }

        let tmp = node;

        while (tmp.left !== null){
            tmp = tmp.left;
        }

        return node.data;
    }

    public contains(data: T): BSTNode<T> | undefined {
        if (!this.root){
            return undefined;
        }

        return this.search(data, this.root);
    }
    private search(data: T, node: BSTNode<T> | null): BSTNode<T> | undefined{
        if (!node) {
            return undefined;
        }

        if (data > node.data){
            return this.search(data, node.right);
        }
        if (data < node.data) {
            return this.search(data, node.left);
        }
        return node;
    }
    public clear(): void{
        if (!this.root){
           return;
        }
        this.root = null;
    }
}

const arrayOfNum: Array<number> = [];

addButton?.addEventListener("click", () => {
    bst.add(+input.value);
    const nodeNum: string = input.value;
    arrayOfNum.push(Number(nodeNum));
    input.value = "";
});

function deleteArr (num: number, array: Array<number>): Array<number> {
    const index = array.indexOf(num);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

removeButton?.addEventListener("click", () => {
    (outputField as any).innerHTML = "";

    bst.delete(+input.value);
    bst.clear();
    deleteArr(+input.value, arrayOfNum);

    for (const value of arrayOfNum){
        bst.add(value);
    }
    input.value = "";
});

(findButton as any).onmousedown = function(): void {
    bst.contains(+input.value);

    const nodeNum: string = input.value;

    for (const value of Array.from(divArr)){
        if (value.innerHTML === nodeNum) {
            (value as HTMLElement).style.background = "red";
        }
    }
};

(findButton as any).onmouseup = function(): void {
    for (const value of Array.from(divArr)){
        if (value.innerHTML === input.value){
            (value as HTMLElement).style.backgroundColor = "rgb(192, 167, 130)";
        }
     }
    input.value = "";
};


const bst: BST<number> = new BST();
