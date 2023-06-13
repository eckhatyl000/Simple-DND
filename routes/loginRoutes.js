const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('login.html');
});

router.post('/', (req, res) => {
    // TODO: Perform authentication here
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

module.exports = router;






