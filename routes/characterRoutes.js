const express = require('express');
const router = express.Router();
const { getCharacterById, createCharacter } = require('../controllers/characterController');

router.put('/characters', createCharacter);
router.get('/characters/:id', getCharacterById);

module.exports = router;

