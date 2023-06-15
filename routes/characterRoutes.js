const express = require('express');
const router = express.Router();
const { getCharacterById, createCharacter, updateCharacter, deleteCharacter } = require('../controllers/characterController');

router.put('/characters', createCharacter);
router.get('/characters/:id', getCharacterById);
router.put('/characters/:id', updateCharacter);
router.delete('/characters/:id', deleteCharacter);

module.exports = router;
