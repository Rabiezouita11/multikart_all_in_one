document.addEventListener("DOMContentLoaded", function() {
    const myAccountLinks = document.querySelectorAll('.mobile-account');

    // Check if user data exists in localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        showLoggedInUser(loggedInUser);
    } else {
        // If user is not logged in, show login and register links
        myAccountLinks.forEach(function(link) {
            link.querySelector('.onhover-show-div').innerHTML = `
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
            `;
        });
    }

    // Function to show logged-in user's name
    function showLoggedInUser(user) {
        const userName = user.name;
        myAccountLinks.forEach(function(link) {
            link.querySelector('.onhover-show-div').innerHTML = `
                <li>Welcome, ${userName}</li>
                <li><a id="logout" href="#">Logout</a></li>
            `;
        });
    }

    // Handle logout
    document.addEventListener('click', function(event) {
        if (event.target.id === 'logout') {
            event.preventDefault();
            localStorage.removeItem('loggedInUser');
            // Redirect to login page or perform any other action as needed
            window.location.href = 'login.html';
        }
    });
});
