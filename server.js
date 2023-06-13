const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoutes');
const creatAccountRoute = require('./routes/createAccountRoutes');
const authRoute = require('./routes/authRoutes');
const characterRoute = require('./routes/characterRoutes');
const { registerUser, loginUser } = require('./controllers/authController');
const { createCharacter, getCharacterById } = require('./controllers/characterController');

let users = [];
let characters = [];

app.use(bodyParser.json());

app.use('/', loginRoute);
app.use('/', creatAccountRoute);
app.use('/', authRoute);
app.use('/', characterRoute);

app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/characters', createCharacter);
app.get('/characters/:id', getCharacterById);

app.listen(3000, () => console.log('Server started on port 3000.'));



