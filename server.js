const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON bodies for this app. Make sure you put this line before your routes!
app.use(bodyParser.json());

let userData = [];  // A list to store user data.

// A route for registering a new user.
app.post('/register', (req, res) => {
    const user = req.body; // Get user data from the request body.
    userData.push(user); // Push the user data to our list.
    res.json({ message: 'User registered successfully' });
});

// A route for retrieving all users.
app.get('/users', (req, res) => {
    res.json(userData);
});

// A route for logging in a user.
app.post('/login', (req, res) => {
    const { username, password } = req.body; // Get username and password from the request body.

    // Find the user in our list.
    const user = userData.find(u => u.username === username && u.password === password);

    if (user) { // If the user is found and the password matches
        res.json({ message: 'Logged in successfully' });
    } else { // If the user is not found or the password does not match
        res.json({ message: 'Invalid username or password' });
    }
});

app.listen(3000, () => console.log('Server started on port 3000.'));


