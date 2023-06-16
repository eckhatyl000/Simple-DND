const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const creatAccountRoute = require('./routes/createAccountRoutes');
const authRoute = require('./routes/authRoutes');
const characterRoute = require('./routes/characterRoutes');
const { registerUser, loginUser } = require('./controllers/authController');


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

app.post('/register', registerUser);
app.post('/login', loginUser);


app.listen(8080, () => console.log('Server started on port 8080.'));

module.exports = { users, characters };

