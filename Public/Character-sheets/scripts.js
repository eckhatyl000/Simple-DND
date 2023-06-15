const createCharacter = async (characterData) => {
    try {
        const response = await axios.put('/api/characters', characterData);
        console.log(response.data); 
    } catch (error) {
        console.error(error); 
    }
};

const getCharacterDetails = async (characterId) => {
    try {
        const response = await axios.get(`/api/characters/${characterId}`);
        console.log(response.data); 
    } catch (error) {
        console.error(error); 
    }
};

const updateCharacter = async (characterId, updatedData) => {
    try {
        const response = await axios.put(`/api/characters/${characterId}`, updatedData);
        console.log(response.data); 
    } catch (error) {
        console.error(error); 
    }
};

const saveCharacter = async (characterId, characterData) => {
    try {
        const response = await axios.put(`/api/characters/${characterId}`, characterData);
        console.log(response.data); 
        console.log('Character saved successfully');
    } catch (error) {
        console.error(error); 
    }
};


const deleteCharacter = async (characterId) => {
    try {
        const response = await axios.delete(`/api/characters/${characterId}`);
        console.log(response.data); 
    } catch (error) {
        console.error(error); 
    }
};

window.addEventListener('DOMContentLoaded', async function () {
    const characterSheet = document.getElementById('characterSheet');

    
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('id');

    if (!characterId) {
        characterSheet.innerHTML = 'CREATE A NEW character';
    } else {
        try {
            const response = await getCharacterDetails(characterId);
            
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

