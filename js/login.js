function signIn() {
    var username = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    // Make sure username and password are not empty
    if (!username || !password) {
        document.getElementById('error-message').innerText = 'Username and password are required.';
        return;
    }

    // Fetch team data from endpoint
    fetch('https://g9ffbcf49633931-r4h3m3ix56bxw6ul.adb.af-johannesburg-1.oraclecloudapps.com/ords/admin/team/')
        .then(response => response.json())
        .then(data => {
            // Check if username and password match any team data
            var matchedTeam = data.items.find(item => item.username.toLowerCase() === username.toLowerCase());
            if (matchedTeam) {
                if (matchedTeam.password === password) {
                    document.getElementById('teamName').innerText = data.teamName;
                    // Password matched, redirect to another page (replace 'redirect-url' with your actual URL)
                    localStorage.setItem('isLoggedIn', true); // Example: Use a token or identifier in production
                    localStorage.setItem('teamName', matchedTeam.teamname);
                    localStorage.setItem('folderusername', matchedTeam.username);
                    window.location.href = 'dashboard.html';
                } else {
                    document.getElementById('error-message').innerText = 'Incorrect password.';
                }
            } else {
                document.getElementById('error-message').innerText = 'Username does not exist.';
            }
        })
        .catch(error => {
            console.error('Error fetching team data:', error);
            document.getElementById('error-message').innerText = 'Failed to authenticate. Please try again later.';
        });
}

  
document.addEventListener("DOMContentLoaded", function () {
    const toggleContentButton = document.getElementById('toggleContentButton');
    const passwordInput = document.getElementById('password');

    toggleContentButton.addEventListener('click', function () {
        const icon = toggleContentButton.querySelector('i');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('bx-hide');
            icon.classList.add('bx-show');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('bx-show');
            icon.classList.add('bx-hide');
        }
    });
});
