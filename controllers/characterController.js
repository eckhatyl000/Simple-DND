const Character = require('../models/Character');

// Create a new character
exports.createCharacter = async (req, res) => {
    try {
        const characterData = req.body;
        const character = await Character.create(characterData);
        res.status(201).json({ success: true, character });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create character' });
    }
};

// Get all characters
exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.json({ success: true, characters });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to retrieve characters' });
    }
};

// Get a character by ID
exports.getCharacterById = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findById(id);
        if (!character) {
            return res.status(404).json({ success: false, error: 'Character not found' });
        }
        res.json({ success: true, character });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to retrieve character' });
    }
};

// Update a character
exports.updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const characterData = req.body;
        const character = await Character.findByIdAndUpdate(id, characterData, { new: true });
        if (!character) {
            return res.status(404).json({ success: false, error: 'Character not found' });
        }
        res.json({ success: true, character });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update character' });
    }
};

// Delete a character
exports.deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByIdAndDelete(id);
        if (!character) {
            return res.status(404).json({ success: false, error: 'Character not found' });
        }
        res.json({ success: true, message: 'Character deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete character' });
    }
};

