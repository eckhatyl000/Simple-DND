const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile('../public/Login/login.html', { root: __dirname + '/../' });
});

router.post('/', (req, res) => {
    
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

module.exports = router;







