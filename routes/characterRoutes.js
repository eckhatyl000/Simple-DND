const express = require('express');
const router = express.Router();

router.put('/characters/:id', (req, res) => {
    const characterData = req.body;
    const characters = req.app.get('characters');

    const index = characters.findIndex(c =>
        c.name === characterData.name &&
        c.characterClass === characterData.characterClass &&
        c.level === characterData.level
    );

    if (index === -1) {
        return res.status(404).send('Character not found');
    }

    const updatedCharacter = { ...characters[index], ...characterData };
    characters[index] = updatedCharacter;

    res.json({ message: 'Character updated successfully', character: updatedCharacter });
});

router.post('/characters', (req, res) => {
    const characterData = req.body;
    const characters = req.app.get('characters');

    characters.push(characterData);
    res.status(201).json({ message: 'Character created successfully' });
});

router.get('/characters', (req, res) => {
    const characters = req.app.get('characters');
    res.json(characters);
});

router.get('/characters/:id', (req, res) => {
    const characterData = req.body;
    const characters = req.app.get('characters');
    const character = characters.find(c =>
        c.name === characterData.name &&
        c.characterClass === characterData.characterClass &&
        c.level === characterData.level
    );

    if (!character) {
        return res.status(404).send('Character not found');
    }

    res.json(character);
});

router.delete('/characters/:id', (req, res) => {
    const characterData = req.body;
    const characters = req.app.get('characters');
    const index = characters.findIndex(c =>
        c.name === characterData.name &&
        c.characterClass === characterData.characterClass &&
        c.level === characterData.level
    );

    if (index === -1) {
        return res.status(404).send('Character not found');
    }

    characters.splice(index, 1);
    res.json({ message: 'Character deleted successfully' });
});

module.exports = router;

