const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn) {
    window.location.href = 'login.html'; // Redirect to login page if not logged in
}
const logoutLink = document.getElementById('logoutLink');
logoutLink.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('isLoggedIn'); // Clear session
    window.location.href = 'index.html'; // Redirect to login page
});