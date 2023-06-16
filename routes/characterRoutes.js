const express = require('express');
const router = express.Router();
const { characters } = require('./path_to_your_server.js_file');


router.put('/characters/:id', (req, res) => {
    const characterId = req.params.id;
    const characterData = req.body;

    const index = characters.findIndex(c => c.id === characterId);

    if (index === -1) {
        return res.status(404).send('Character not found');
    }

    const updatedCharacter = { ...characters[index], ...characterData };
    characters[index] = updatedCharacter;

    res.json({ message: 'Character updated successfully', character: updatedCharacter });
});

router.post('/characters', (req, res) => {
    const characterData = req.body;
    const existingCharacter = characters.find(c => c.name === characterData.name);

    if (existingCharacter) {
        return res.status(400).json({ error: 'Character name already exists' });
    }

    characters.push(characterData);
    res.status(201).json({ message: 'Character created successfully' });
});

router.get('/characters/:id', (req, res) => {
    const characterId = req.params.id;
    const character = characters.find(c => c.id === characterId);

    if (!character) {
        return res.status(404).send('Character not found');
    }

    res.json(character);
});

router.delete('/characters/:id', (req, res) => {
    const characterId = req.params.id;
    const index = characters.findIndex(c => c.id === characterId);

    if (index === -1) {
        return res.status(404).send('Character not found');
    }

    characters.splice(index, 1);
    res.json({ message: 'Character deleted successfully' });
});

module.exports = router;
