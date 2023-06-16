const express = require('express');
const router = express.Router();
const { users } = require('../server.js');


router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (users[username]) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        users[username] = password;

        res.json({ message: 'Account created successfully' });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Error creating account' });
    }
});

module.exports = router;



