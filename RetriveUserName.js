document.addEventListener("DOMContentLoaded", function() {
    const myAccountLinks = document.querySelectorAll('.mobile-account');

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        showLoggedInUser(loggedInUser);
    } else {
        myAccountLinks.forEach(function(link) {
            link.querySelector('.onhover-show-div').innerHTML = `
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
            `;
        });
    }

    function showLoggedInUser(user) {
        const userName = user.name;
        myAccountLinks.forEach(function(link) {
            link.querySelector('.onhover-show-div').innerHTML = `
                <li>Welcome, ${userName}</li>
                <li><a id="logout" href="#">Logout</a></li>
            `;
        });
    }

    document.addEventListener('click', function(event) {
        if (event.target.id === 'logout') {
            event.preventDefault();
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        }
    });
});
