'use strict'
let listButton = document.getElementsByTagName('a');

for (let i = 0; i < listButton.length; i++){
    listButton[i].addEventListener('click', () =>{
        alert(`You cliked link number #${i+1}`);
    });
}
