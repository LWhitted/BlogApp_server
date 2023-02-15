const express = require("express");
var app = express();
const PORT = 3000;

const blogs = [];
const Sequelize = require('sequelize');
const { Post } = require('./models');
console.log(Post)
const db = require('./models');
app.use(express.json());
app.use(express.static(__dirname + '/public'));
// console.log(db.findAll())
// console.log(Post.findAll())

app.get('/', (req, res) => {
    res.render('index', { blogs });
})

// add post
app.post('/posts', async (req, res) => {
    console.log(req.body);
    // req.body contains an Object with firstName, lastName, email
    const { title, body, category, isPublished } = req.body;
    const newPost = await Post.create({
        title,
        body,
        category,
        isPublished
    });

    // Send back the new user's ID in the response:
    res.json({
        id: newPost.id
    });
})
// delete post
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const deletedPost = await Post.destroy({
        where: {
            id
        }
    });
    res.json(deletedPost);
});
// update post
app.post('/posts/:id', async (req, res) => {
    const { id } = req.params;

    // Assuming that `req.body` is limited to
    // the keys title, body, and category
    const updatedPost = await Post.update(req.body, {
        where: {
            id
        }
    });

    res.json(updatedPost);
});
// find all
app.get('/posts', async (req, res) => {
    console.log(Post)
    const allPosts = await Post.findAll();
    res.json(allPosts);
});

// filter by categories
app.get('/posts/by-categories', async (req, res) => {
    const posts = await Post.findAll({
        attributes: ['category']
    });
    res.json(posts);
});

// this get is for a single post
// the only thing with this is I am unsure how to make it search whatever
// one post the client is looking for.
// right now it will reflect a post if its title is "My Title"
app.get('posts/by-title', async (req, res) => {
    const onePost = await Post.findOne({ where: { title: 'My Title' } });
    if (onePost === null) {
        console.log('Not found!');
    } else {
        console.log(onePost instanceof Post);
        console.log(onePost.title);
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})