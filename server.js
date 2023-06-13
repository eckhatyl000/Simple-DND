const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoutes');
const creatAccountRoute = require('./routes/createAccountRoutes');
const dashboardRoute = require('./routes/dashboardRoutes');
const authRoute = require('./routes/authRoutes');
const characterRoute = require('./routes/characterRoutes');




let users = [];

let characters = [];


app.use(bodyParser.json());

app.use('/', loginRoute);
app.use('/', creatAccountRoute);
app.use('/', dashboardRoute);
app.use('/', authRoute);
app.use('/', characterRoute);


app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);

    res.status(201).json(newUser);
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.json({ message: 'Login successful', userId: user.id });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});


app.post('/characters', (req, res) => {
    const character = req.body;
    character.id = characters.length + 1;  
    characters.push(character);
    res.status(201).json(character);
});


app.get('/characters', (req, res) => {
    res.json(characters);
});


app.get('/characters/:id', (req, res) => {
    const { id } = req.params;
    const character = characters.find(character => character.id === parseInt(id));

    if (character) {
        res.json(character);
    } else {
        res.status(404).json({ message: 'Character not found' });
    }
});

app.listen(3000, () => console.log('Server started on port 3000.'));



