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

        const createdCharacter = data.character;
        const characterId = createdCharacter.id;

        
        getCharacterDetails(characterId);
    } catch (error) {
        console.error(error);
    }
};


const getCharacterDetails = async (character) => {
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

        if (response.ok) {
            console.log('Character saved successfully');
        } else {
            console.error('Failed to save character');
        }
    } catch (error) {
        console.error(error);
    }
};



const deleteCharacter = async (characterId) => {
    try {
        const response = await fetch(`/characters/${characterId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Character deleted successfully');
        } else {
            console.error('Failed to delete character');
        }
    } catch (error) {
        console.error(error);
    }
};



function getCharacterData() {
    const nameInput = document.getElementById('name');
    const classInput = document.getElementById('class');
    const levelInput = document.getElementById('level');

    const characterData = {
        name: nameInput.value,
        characterClass: classInput.value,
        level: parseInt(levelInput.value)
    };

    return characterData;
};
function displayCharacter(character) {
    const characterSheet = document.getElementById('characterSheet');
    characterSheet.innerHTML = `
        <h2>${character.name}</h2>
        <ul>
            <li>Class: ${character.characterClass}</li>
            <li>Level: ${character.level}</li>
            <!-- Add more character details as needed -->
        </ul>
    `;
        console.log(character);
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



window.addEventListener('DOMContentLoaded', async function () {
    try {
        
        const response = await fetch('/characters');
        const data = await response.json();
        console.log(data);

        
        data.forEach(character => {
            displayCharacter(character);
        });
    } catch (error) {
        console.error(error);
    }
});

