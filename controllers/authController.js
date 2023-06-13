const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        const isValid = await isValidCredentials(username, password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create a new user
        const user = new User({ username, password });
        await user.save();

        res.json({ message: 'Account created successfully' });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Error creating account' });
    }
});

async function isValidCredentials(username, password) {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        return false;
    }

    return password === existingUser.password;
}

module.exports = router;
