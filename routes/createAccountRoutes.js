const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    try {
        const { username, password } = req.body;
        const users = req.app.get('users');

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




