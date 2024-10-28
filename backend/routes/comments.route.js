const express = require('express');
const router = express.Router();
const {getAllComments, addComment,deleteAllComments} = require('../database');

router.get('/comments', async (req, res) => {
    const comments = await getAllComments();
    res.json(comments);
});

router.post('/comments', async (req, res) => {
    const {username, comment} = req.body;
    const newComment = await addComment(username, comment);
    res.json(newComment);
});

router.delete('/comments', async (req, res) => {
    const comments = await deleteAllComments();
    res.json(comments);
});

module.exports = router;