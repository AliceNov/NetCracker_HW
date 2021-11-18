let url = 'http://localhost:3000/posts';
let div = document.getElementById('posts');
let getButton = document.getElementById('getButton');
let setButton = document.getElementById('setButton');

function drawUser(item){
    const author = document.createElement("h3");
    const title = document.createElement("p");
    author.innerHTML = item.author || 'No author';
    title.innerHTML = item.title || 'No content';
    div.appendChild(author);
    div.appendChild(title);
}

function drawUsers(response) {
    response.forEach((item) => {
        drawUser(item);
    })
}

getButton.onclick = () => {
    let response = fetch(url)
        .then(response => response.json())
        .then(response => drawUsers(response))
}

setButton.addEventListener('click', () => {
    let author = document.getElementById('author').value;
    let title = document.getElementById('title').value;

    let post = {
        author: author,
        title: title
    }

    let response = fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(response => drawUser(response))
})
