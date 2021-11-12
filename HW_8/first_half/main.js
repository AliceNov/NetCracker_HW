function unique_values(){
    if(this.length === 0){
        console.log("ERROR: This array is empty");
        return;
    }

    let resalt = [...new Set(this)];

    return console.log(resalt);
}

Array.prototype.unique = unique_values;

let array = [1, 2, 2, 3, 4, 4, 3, 2, 5, 6, 1, 7, 9, 5, 5];

let emptyArray = [];

array.unique();
emptyArray.unique();