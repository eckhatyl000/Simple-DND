const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const creatAccountRoute = require('./routes/createAccountRoutes');
const authRoute = require('./routes/authRoutes');
const characterRoute = require('./routes/characterRoutes');
const { registerUser, loginUser } = require('./controllers/authController');
const { createCharacter, getCharacterById } = require('./controllers/characterController');

let users = [];
let characters = [];

app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use(express.static(__dirname + 'Simple-DND/Public/Login'));
app.use(express.static(__dirname + 'Simple-DND/Public/Login/create-account'));
app.use(express.static(__dirname + 'Simple-DND/Public/Dashboard'));
app.use(express.static(__dirname + 'Simple-DND/Public/character-notes'));
app.use(express.static(__dirname + 'Simple-DND/Public/saved-characters'));
app.use(express.static(__dirname + 'Simple-DND/Public/account-page'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Public/Login/login.html');
});

app.use('/', creatAccountRoute);
app.use('/', authRoute);
app.use('/', characterRoute);

app.put('/register', registerUser);
app.put('/login', loginUser);

app.put('/characters', async (req, res) => {
    try {
        const response = await axios.put('/api/characters', req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating character');
    }
});


app.get('/characters/:id', async (req, res) => {
    const characterId = req.params.id;
    try {
        const response = await axios.get(`/api/characters/${characterId}`);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching character details');
    }
});

app.delete('/characters/:id', async (req, res) => {
    const characterId = req.params.id;
    try {
        const response = await axios.delete(`/api/characters/${characterId}`);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting character');
    }
});




app.listen(8080, () => console.log('Server started on port 8080.'));



