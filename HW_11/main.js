let buttonFeedPaimon = document.getElementById('feed1');
let buttonTryAgain = document.getElementById('feed2');
let notification = document.getElementById('notification');
let paimon = document.getElementById('image');
let dishBurned = true;

buttonFeedPaimon.addEventListener('click', () => {
    let willFeedPaimon = new Promise(function(resolve,reject) {
        setTimeout(() => {
            paimon.src = 'image/ThereSheIs.gif';
            notification.innerHTML = 'Oh, there she is!';
            console.log('Start cooking');
            let dish = {
                name: 'Stiky Honey Roast',
                done: false
            }
            resolve(dish)
        }, 3000)
    })
    
    willFeedPaimon.then(dish => {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                if(dishBurned){
                    paimon.src = 'image/angry.gif';
                    notification.innerHTML = 'Sorry, your dish is burnt, and it seems Paimon is dissatisfied(( Try again';
                    console.log('Try again');
                    dishBurned = false;
                    buttonFeedPaimon.style.display = "none";
                    buttonTryAgain.style.display = "block";
                    reject(dish)
                }
            }, 3000)
        })
    })
    .catch(err => console.error('Error: ', err))
});

buttonTryAgain.addEventListener('click', () => {
    let notification = document.getElementById('notification');

    let willFeedPaimon = new Promise(function(resolve,reject) {
        setTimeout(() => {
            buttonTryAgain.style.display = "none";
            paimon.src = 'image/try.gif';
            notification.innerHTML = 'Try to please Paimon';
            console.log('Start cooking');
            let dish = {
                name: 'Stiky Honey Roast',
                done: false
            }
            resolve(dish)
        }, 2000)
    })
    
    willFeedPaimon.then(dish => {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                if(!dishBurned){
                    paimon.src = 'image/getting.gif';
                    notification.innerHTML = 'You seem to be getting it';

                    console.log('Cooking continues');
                    resolve(dish)
                }
            }, 3000)
        })
    })
    .then(dish => {
        dish.done = true;
        return dish
    })
    .then(dish => {
        setTimeout(() => {
            paimon.src = 'image/overeat.jpg';
            notification.innerHTML = 'Oh, it seems Paimon ate too much';
            
            console.log('Hooray, dish is done', dish);
        }, 2000)  
    })
});


