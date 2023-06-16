const createCharacter = (req, res) => {
    const newCharacter = req.body;
    const characters = req.app.get('characters');
    characters.push(newCharacter);
    res.json({ message: 'Character created successfully' });
};

const getCharacterById = (req, res) => {
    const characterId = req.params.id;
    const characters = req.app.get('characters');
    const character = characters.find(c => c.id === characterId);
    res.json(character);
};

const deleteCharacter = (req, res) => {
    const characterId = req.params.id;
    const characters = req.app.get('characters');
    const characterIndex = characters.findIndex(c => c.id === characterId);
    if (characterIndex === -1) {
        res.status(404).json({ message: 'Character not found' });
    } else {
        characters.splice(characterIndex, 1);
        res.json({ message: 'Character deleted successfully' });
    }
};

const saveCharacter = (req, res) => {
    const characterId = req.params.id;
    const characterData = req.body;
    const characters = req.app.get('characters');

    const characterIndex = characters.findIndex(c => c.id === characterId);
    if (characterIndex === -1) {
        res.status(404).json({ message: 'Character not found' });
    } else {
        const updatedCharacter = { ...characters[characterIndex], ...characterData };
        characters[characterIndex] = updatedCharacter;
        res.json({ message: 'Character saved successfully', character: updatedCharacter });
    }
};

module.exports = {
    createCharacter,
    getCharacterById,
    deleteCharacter,
    saveCharacter,
};



