let users = []; 

const registerUser = (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'User logged in successfully' });
};

module.exports = {
    registerUser,
    loginUser,
};

