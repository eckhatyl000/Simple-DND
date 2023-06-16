function rollDice() {
    const diceType = document.getElementById('diceType').value;
    const diceAmount = document.getElementById('diceAmount').value;
    const outputContainer = document.getElementById('diceOutput');

    
    outputContainer.innerHTML = '';

    
    if (diceType === '' || diceAmount === '') {
        displayError('Please select a dice type and enter the amount.');
        return;
    }

    if (!Number.isInteger(+diceAmount) || +diceAmount <= 0) {
        displayError('Please enter a valid positive number for dice amount.');
        return;
    }

    const validDiceTypes = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'];
    if (!validDiceTypes.includes(diceType)) {
        displayError('Please select a valid dice type.');
        return;
    }

    
    let total = 0;
    let rolls = [];

    for (let i = 0; i < diceAmount; i++) {
        const roll = Math.floor(Math.random() * parseInt(diceType.slice(1))) + 1;
        rolls.push(roll);
        total += roll;
    }

    
    const resultHTML = document.createElement('div');
    resultHTML.innerHTML = `
    <p>Rolling ${diceAmount} ${diceType}(s)...</p>
    <p>Results: ${rolls.join(', ')}</p>
    <p>Total: ${total}</p>
  `;

    outputContainer.appendChild(resultHTML);
}

function displayError(message) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.textContent = message;
};

function goToCharacterSheet() {
    window.location.href = '/Public/Character-sheets/character-sheet.html';
};

document.getElementById('logoutButton').addEventListener('click', function () {
   
    window.location.href = '../login.html';
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

