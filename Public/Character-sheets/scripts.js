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

const updateCharacter = async (character, updatedData) => {
    try {
        
        const index = characters.findIndex(c => c === character);

        if (index !== -1) {
            
            Object.assign(character, updatedData);
            console.log('Character updated successfully');
        } else {
            console.error('Character not found');
        }
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




const deleteCharacter = async (character) => {
    try {
        
        const index = characters.findIndex(c => c === character);

        if (index !== -1) {
            
            characters.splice(index, 1);
            console.log('Character deleted successfully');
        } else {
            console.error('Character not found');
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
      <li>Name: ${character.name}</li>
      <li>Class: ${character.class}</li>
      <li>Level: ${character.level}</li>
    </ul>
  `;
    console.log(character);
}

window.addEventListener('DOMContentLoaded', async function () {
    const characterSheet = document.getElementById('characterSheet');
    const createButton = document.getElementById('create-character');
    const form = document.querySelector('form');
    const characterList = document.getElementById('characterList');
    const characterSelect = document.getElementById('character-select');
    const viewButton = document.getElementById('view-character');

    const populateCharacterOptions = (characters) => {
        characterSelect.innerHTML = '<option value="">-- Select a character --</option>';
        characters.forEach((character, index) => {
            const option = document.createElement('option');
            option.value = index.toString();
            option.textContent = character.name;
            characterSelect.appendChild(option);
        });
    };

    const handleViewCharacter = async () => {
        const selectedIndex = characterSelect.selectedIndex;
        if (selectedIndex === 0) {
            return;
        }

        try {
            const response = await fetch('/characters');
            const characters = await response.json();
            const selectedCharacter = characters[selectedIndex - 1]; 
            displayCharacter(selectedCharacter);
        } catch (error) {
            console.error(error);
        }
    };

    viewButton.addEventListener('click', handleViewCharacter);

    createButton.addEventListener('click', async function (event) {
        event.preventDefault();
        const characterData = getCharacterData();
        await createCharacter(characterData);
        form.reset();
        await fetchCharactersAndDisplayLatest();
    });

    try {
        await fetchCharactersAndDisplayLatest();
        const response = await fetch('/characters');
        const characters = await response.json();
        populateCharacterOptions(characters);

        characterList.addEventListener('click', async (event) => {
            if (event.target.classList.contains('delete-character')) {
                const characterId = event.target.dataset.characterId;
                await deleteCharacter(characterId);
                await fetchCharactersAndDisplayLatest();
            }
        });
        characterList.addEventListener('click', async (event) => {
            if (event.target.classList.contains('update-character')) {
                const characterId = event.target.dataset.characterId;
                await updateCharacter(characterId);
                await fetchCharactersAndDisplayLatest();
            }
        });

    } catch (error) {
        console.error(error);
    }
});

async function fetchCharactersAndDisplayLatest() {
    const characterSheet = document.getElementById('characterSheet');
    const characterList = document.getElementById('characterList');

    try {
        const response = await fetch('/characters');
        const data = await response.json();

        if (data.length === 0) {
            characterSheet.innerHTML = 'No characters found';
        } else {
            const latestCharacter = data[data.length - 1];
            characterSheet.innerHTML = `
                <h2>${latestCharacter.name}</h2>
                <ul>
                    <li>Class: ${latestCharacter.characterClass}</li>
                    <li>Level: ${latestCharacter.level}</li>
                    <li>Name: ${latestCharacter.name}</li>
                </ul>
            `;
        }

        characterList.innerHTML = '';

        data.forEach(character => {
            const characterItem = document.createElement('div');
            characterItem.textContent = character.name;
            characterList.appendChild(characterItem);
        });
    } catch (error) {
        console.error(error);
    }
};


