const express = require('express');
const router = express.Router();

// Protected route
router.get('/protected', (req, res) => {
    // Access the authenticated user via req.user
    console.log({message: 'This is a protected route', user: req.user });
});

module.exports = router;
