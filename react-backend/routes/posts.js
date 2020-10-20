const express = require('express');
const router = express.Router();

const postController = require('../controllers/postsController')

router.get('/', function(req, res) {
    const posts = postController.getAllPosts();
    res.status(200).send(posts);
});

router.post('/', function(req, res) {
    const post = req.body;
    try {
        postController.addPost(post)
        res.status(201).send(post);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/:id', function(req, res) {
    const postId = Number(req.params.id);
    try {
        const targetPost = postController.getPostById(postId)
        res.status(200).send(targetPost);
    } catch (e) {
        res.sendStatus(404);
    }
});

module.exports = router;
