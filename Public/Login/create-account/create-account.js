document.getElementById('createAccountForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    
    if (password !== confirmPassword) {
        alert('Password and confirm password do not match');
        return;
    }

    
    const userData = {
        username: username,
        password: password
    };

    
    fetch('/register', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data.id) {
                window.location.href = 'Public/Login/login.html';
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('loginForm').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'Public/Login/login.html';
});

