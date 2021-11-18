function unique_values(){
    if(this.length === 0){
        console.log("ERROR: This array is empty");
        return;
    }

    let result = [...new Set(this.map(JSON.stringify))].map(JSON.parse);

    return console.log(result);
}

Array.prototype.unique = unique_values;

let array = [1, 2, 2, 3, 4, 4, 3, 2, 5, { name: 'Vasya', type: 'Cat', age: 4},{ name: 'Vasya', type: 'Cat', age: 4}];

let emptyArray = [];

array.unique();
emptyArray.unique();








