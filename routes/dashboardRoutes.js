const path = require('path');
const characters = require('../Character-sheets/character-sheet.html'); 

exports.dashboard = (req, res) => {
    try {
        
        res.status(200).sendFile(path.join(__dirname, '..', 'Public', 'Dashboard', 'dashboard.html'), {
            characters: characters
        });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

