const inputButton = document.getElementById('btn1');

inputButton.addEventListener('click', () =>{
    let text = document.getElementById('input1').value;

    if (typeof text !== 'string' || !text.replace(/^\s+|\s+$/g, '')){
        console.log("Error: The data is not a string");
        return false;
    }

    let words = text.split(/[ .,\/#!$%\^&\*;:{}=\-_`~()—]/);
    let filtredWords = words.filter(Boolean);
    let mapForWords = {};

    for (let i = 0; i < filtredWords.length; i++){
        let currentCount =mapForWords[filtredWords[i]];
        let count = currentCount ? currentCount : 0;
        mapForWords[filtredWords[i]] = count + 1;
    }
    
    let top3 = Object.keys(mapForWords).sort(function(x,y){return mapForWords[y]-mapForWords[x]});

    console.log(top3.splice(0,3));

});