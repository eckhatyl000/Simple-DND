const express = require('express');
const router = express.Router();
const { getCharacterById, createCharacter } = require('./controllers');

router.post('/characters', createCharacter);
router.get('/characters/:id', getCharacterById);

module.exports = router;

