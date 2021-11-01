function Helper () {

    this.isObject = function (obj){
        if (typeof(obj) === 'object' || obj instanceof Object){
            return true;
        } else {      
            return false;
        }      
    }

    this.isEmpty = function (obj){
        if(!this.isObject(obj)){
            return false;
        }
        for(let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false
            }
        }
        return true;   
    }

    this.deepClone = function (obj){
        let clone = {};
        if(!this.isObject(obj)){
            return false;
        }
        for (let key in obj){
            if ((typeof obj[key]) == 'object'){
                clone[key] = this.deepClone(obj[key]);
            } else {
                clone[key] = obj[key];
            }    
        }
        return clone;
    }
    
    this.isEqual = function (obj1, obj2){
        if(!this.isObject(obj1) || !this.isObject(obj2)){
            return false;
        }
        let props1 = Object.getOwnPropertyNames(obj1);
        let props2 = Object.getOwnPropertyNames(obj2);

        if (props1.length !== props2.length){
            return false;
        }

        for (let i = 0; i < props1.length; i++){
            let prop = props1[i];
            if (this.isObject(obj1[prop]) && this.isObject(obj2[prop])){
                this.isEqual(obj1[prop], obj2[prop]);
            } else {
                if(obj1[prop] !== obj2[prop]){
                    return false;
                }
            }
        }

        return true;
    }

    this.hasKey = function (obj, key){
        if(!this.isObject(obj)){
            return false;
        }

        let i = 0;
        for(let prop in obj){
            if (this.isObject(obj[prop])){
                i = this.hasKey(obj[prop], key);
            } else {
                if (obj.hasOwnProperty(key)) {
                  i++;     
                }
            }
            if(i == 1){
                return true;
            }
        }   
       
        return false;
    }

    this.findValue = function (obj, key){
        if(!this.isObject(obj)){
            return false;
        }

        let result = '';
        for(let prop in obj){
            if(this.isObject(obj[prop])){
               result = this.findValue(obj[prop], key);
            }else {
                if(obj.hasOwnProperty(key)){
                    result = obj[key];
                    break;
                }
            }
        } 

        if (result == ''){
            result = 'No value';
            return result;
        } else {
            return result;
        }   
    }

    Object.defineProperties(this,{
        'isObject': {
            writable: false
        },  
        'isEmpty': {
            writable: false
        }, 
        'deepClone': {
            writable: false
        }, 
        'isEqual': {
            writable: false
        }, 
        'hasKey': {
            writable: false
        }, 
        'findValue': {
            writable: false
        } 
    }) 
}


let helper = new Helper ();


const object1 = {
    title: "Title",
    id: 1
};
  
const object2 = {
    title: "Title",
    id: 1
};

const object3 = {
    title: "Another title",
    id: 3
};
  
const user = {
    name: 'Vasya',
    married: true,
    age: 25,
    friends: ['Kolya', 'Petya'],
    children: [
      { name: 'Mila', age: 1 },
      { name: 'Petr', age: 10},
    ],
    company: {
      name: 'Hexlet',
      toy: 'TeddyBear'
    },
};


const checkObj = helper.isObject(user);
const checkForEmpty = helper.isEmpty(user);
const checkKey = helper.hasKey(user, 'toy');
const clone = helper.deepClone(user);
const equalObj = helper.isEqual(user, clone); 
const notEqualObj = helper.isEqual(user, object3); 
const valueKey = helper.findValue(user, 'toy');

console.log(checkObj);
console.log(checkForEmpty);
console.log(checkKey);
console.log(clone);
console.log(equalObj);
console.log(notEqualObj);
console.log(valueKey);


