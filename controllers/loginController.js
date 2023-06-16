exports.login = (req, res) => {
    const { username, password } = req.body;

   
    if (username === 'admin' && password === 'password') {
        
        const token = 'your-authentication-token';

        res.json({ success: true, message: 'Login successful', token });
    } else {
        
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
};

