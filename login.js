document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.theme-form');
    const myAccountLink = document.querySelector('.mobile-account');
    const logoutLink = document.getElementById('logout');

    // Check if user data exists in localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        showLoggedInUser(loggedInUser);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('json/users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.email === email && user.password === password);
                if (user) {
                    // Redirect based on user's role
                    if (user.role === 'admin') {
                        window.location.href = '/back-end/category.html'; // Redirect to backend for admin
                    } else if (user.role === 'client') {
                        window.location.href = '/front-end/index.html'; // Redirect to frontend for client
                    }
                    localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store user data in localStorage
                    showLoggedInUser(user); // Show logged-in user's name
                } else {
                    alert('Invalid email or password. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    });

    // Function to show logged-in user's name and hide login/register links
    function showLoggedInUser(user) {
        const userName = user.name;
        myAccountLink.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i> ${userName}`;
        myAccountLink.classList.add('logged-in'); // Add a class to style logged-in state if needed
    }

    // Handle logout
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('loggedInUser');
        // Redirect to login page or perform any other action as needed
        window.location.href = '/front-end/login.html';
    });
});
