window.addEventListener('DOMContentLoaded', function () {
    
    fetch('/api/account')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch account information');
            }
            return response.json();
        })
        .then((data) => {
            
            document.getElementById('username').textContent = data.username;
            document.getElementById('email').textContent = data.email;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to fetch account information');
        });
});

