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
<<<<<<< HEAD:public/LOGOUT.js
        window.location.href = 'LOGIN_FINAL.html';
=======
        window.location.href = 'LOGIN FINAL.html';
>>>>>>> 6f3832743fb74fb9cb98e68ab882473d4cf4d84e:LOGOUT.js
    });

    cancelLogout.addEventListener('click', function() {
        confirmationContainer.style.display = 'none';
    });
});