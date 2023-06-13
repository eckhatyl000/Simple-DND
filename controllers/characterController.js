let characters = []; 

const createCharacter = (req, res) => {
    const newCharacter = req.body;
    characters.push(newCharacter);
    res.json({ message: 'Character created successfully' });
};

const getCharacterById = (req, res) => {
    const characterId = req.params.id;
    const character = characters.find(c => c.id === characterId);
    res.json(character);
};

module.exports = {
    createCharacter,
    getCharacterById,
};


