const express = require('express');
const router = express.Router();
const { getCharacterById, createCharacter, deleteCharacter } = require('../controllers/characterController');

router.put('/characters', createCharacter);
router.get('/characters/:id', getCharacterById);
router.delete('/characters/:id', deleteCharacter);

module.exports = router;
