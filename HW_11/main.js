let willDoHW = new Promise(function(resolve,reject) {
    setTimeout(() => {
        console.log('Getting ready to do HW');
        let homeWork = {
            name: 'History',
            done: false
        }
        resolve(homeWork)
    }, 2000)
})

let playTheGame = true;

willDoHW.then(homeWork => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            if(playTheGame){
                console.log('Sorry, but she fell into the Joker`s trap');
                reject(homeWork)
            } else {
                console.log('The HW is almost ready. She went to have a snack');
                resolve(homeWork)
            }
        }, 2000)
    })
})
.then(homeWork => {
    homeWork.done = true
    return homeWork
})
.then(homeWork => {
    setTimeout(() => {
        console.log('Hooray, HW is done', homeWork);
    }, 2000)   
})
.catch(err => console.error('Error: ', err))