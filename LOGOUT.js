<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    const confirmationContainer = document.getElementById('confirmationContainer');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior (navigation)
        confirmationContainer.style.display = 'block';
    });

    confirmLogout.addEventListener('click', function() {
        // Perform logout actions here
        alert('Logout successful');
        confirmationContainer.style.display = 'none';
        // Implement actual logout logic here (redirect, clear session, etc.)
        window.location.href = 'LOGIN FINAL.html';
    });

    cancelLogout.addEventListener('click', function() {
        confirmationContainer.style.display = 'none';
    });
=======
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    const confirmationContainer = document.getElementById('confirmationContainer');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior (navigation)
        confirmationContainer.style.display = 'block';
    });

    confirmLogout.addEventListener('click', function() {
        // Perform logout actions here
        alert('Logout successful');
        confirmationContainer.style.display = 'none';
        // Implement actual logout logic here (redirect, clear session, etc.)
        window.location.href = 'LOGIN FINAL.html';
    });

    cancelLogout.addEventListener('click', function() {
        confirmationContainer.style.display = 'none';
    });
>>>>>>> origin/main
});