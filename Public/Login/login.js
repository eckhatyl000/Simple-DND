document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = {
        username: username,
        password: password
    };

    fetch('/login', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User logged in successfully') {
                window.location.href = '../Dashboard/dashboard.html';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('createAccountLink').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'Public/Login/create-account/create-account.html';
});


