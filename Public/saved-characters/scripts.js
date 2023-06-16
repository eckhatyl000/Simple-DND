window.addEventListener('DOMContentLoaded', function () {
    const characterList = document.querySelector('.character-list ul');

    
    const savedCharacters = [
        { id: 1, name: '' },
        { id: 2, name: '' },
        { id: 3, name: '' }
    ];

    
    characterList.innerHTML = '';

    
    savedCharacters.forEach(character => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `character-details.html?id=${character.id}`;
        link.textContent = character.name;
        listItem.appendChild(link);
        characterList.appendChild(listItem);
    });
});

