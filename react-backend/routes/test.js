const express = require('express');
const {resetUsersForTesting} = require('../controllers/userController');
const {resetPostsForTesting} = require('../controllers/postsController');
const router = express.Router();

router.delete('/reset', function(req, res) {
    resetUsersForTesting();
    resetPostsForTesting();
    res.sendStatus(204);
});

module.exports = router;