// Example code for dynamically generating the saved character list
// Replace this code with your actual logic for fetching and displaying saved characters
window.addEventListener('DOMContentLoaded', function () {
    const characterList = document.querySelector('.character-list ul');

    // Dummy data for saved characters
    const savedCharacters = [
        { id: 1, name: 'Your cool character' },
        { id: 2, name: 'Other' },
        { id: 3, name: 'Other' }
    ];

    // Clear the existing character list
    characterList.innerHTML = '';

    // Generate saved character list dynamically
    savedCharacters.forEach(character => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `character-details.html?id=${character.id}`;
        link.textContent = character.name;
        listItem.appendChild(link);
        characterList.appendChild(listItem);
    });
});

