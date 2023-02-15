document.addEventListener('DOMContentLoaded', findAllPosts);

async function findAllPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();
    let htmlString = '';

    for (let i = 0; i < posts.length; i++) {
        htmlString += `<div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${posts[i].title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${posts[i].category}</h6>
        <p class="card-text">${posts[i].post}</p>
            <p>Published to the public (yes/no):..</p>
            <button class="removePost" id=${posts[i].id}> Remove </button>
        </div>`
    }

    document.getElementById("blogPosts").innerHTML = htmlString;
}

function stringifyFormData(fd) {
    const data = {
        title: fd.get('title'),
        post: fd.get('post'),
        category: fd.get('category'),
        isPublished: fd.get('isPublished')
    };
    return JSON.stringify(data);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const stringified = stringifyFormData(data);
    const response = await fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: stringified,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

const form = document.getElementById("addPost");
form.addEventListener("submit", handleSubmit)

const handleDelete = async (e) => {
    if (e.target.className.includes("removePost")) {
        const response = await fetch('/posts/:id', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: e.target.id }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

document.addEventListener("click", handleDelete);