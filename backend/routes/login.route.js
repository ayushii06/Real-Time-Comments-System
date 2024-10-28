const express = require('express');
const router = express.Router();
const {addUsername} = require('../database');

router.post('/login', async (req, res) => {
    const {username} = req.body;
    const newUser = await addUsername(username);
    res.json(newUser);
});

module.exports = router;