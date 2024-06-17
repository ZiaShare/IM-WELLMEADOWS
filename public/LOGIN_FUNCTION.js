document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
  
        const username = document.getElementById('adminInput').value;
        const password = document.getElementById('passwordInput').value;
  
        try {
          const response = await fetch('/admin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ admin: username, password }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'HOMEPAGE.html'; // Redirect to the homepage on successful login
          } else {
            clearPasswordField();
            throw new Error(data.message || 'Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('Login failed. Please try again.');
          clearPasswordField();
        }
      });
    }

    function clearPasswordField() {
        document.getElementById('passwordInput').value = '';
    }

  });
  