const createCharacter = async (characterData) => {
    try {
        const response = await fetch('/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(characterData)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

const getCharacterDetails = async (characterId) => {
    try {
        const response = await fetch(`/characters/${characterId}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

const updateCharacter = async (characterId, updatedData) => {
    try {
        const response = await fetch(`/characters/${characterId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

const saveCharacter = async (characterId, characterData) => {
    try {
        const response = await fetch(`/characters/${characterId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(characterData)
        });
        const data = await response.json();
        console.log(data);
        console.log('Character saved successfully');
    } catch (error) {
        console.error(error);
    }
};


const deleteCharacter = async (characterId) => {
    try {
        const response = await fetch(`/characters/${characterId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

window.addEventListener('DOMContentLoaded', async function () {
    const characterSheet = document.getElementById('characterSheet');
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('id');

    const createButton = document.getElementById('create-character');
    const updateButton = document.getElementById('update-character');
    const saveButton = document.getElementById('save-character');
    const deleteButton = document.getElementById('delete-character');

    createButton.addEventListener('click', function () {
        const characterData = getCharacterData();
        createCharacter(characterData);
    });

    updateButton.addEventListener('click', function () {
        const characterData = getCharacterData();
        updateCharacter(characterId, characterData);
    });

    saveButton.addEventListener('click', function () {
        const characterData = getCharacterData();
        saveCharacter(characterId, characterData);
    });

    deleteButton.addEventListener('click', function () {
        deleteCharacter(characterId);
    });

    if (!characterId) {
        characterSheet.innerHTML = 'CREATE A NEW character';
    } else {
        try {
            let response;
            if (characterId === 'new') {
                response = { data: { characterName: 'New Character' } };
            } else {
                response = await getCharacterDetails(characterId);
            }

            characterSheet.innerHTML = `
        <h2>${response.data.characterName}</h2>
        <ul>
          <li>Race: ${response.data.race}</li>
          <li>Class: ${response.data.characterClass}</li>
          <li>Level: ${response.data.level}</li>
          <!-- Add more character details as needed -->
        </ul>
      `;
        } catch (error) {
            console.error(error);
        }
    }
});





