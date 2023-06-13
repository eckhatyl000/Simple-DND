const path = require('path');
const characters = require('../data/characters'); // Assuming you have a file containing character data

exports.dashboard = (req, res) => {
    try {
        // Serve the static file along with the character data
        res.status(200).sendFile(path.join(__dirname, '..', 'Public', 'Dashboard', 'dashboard.html'), {
            characters: characters
        });
    } catch (error) {
        // Handle any errors that occur during file serving
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

