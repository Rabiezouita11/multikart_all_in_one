document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.theme-form');
    const myAccountLink = document.querySelector('.mobile-account');
    const logoutLink = document.getElementById('logout');

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
                    if (user.role === 'admin') {
                        window.location.href = '/back-end/category.html';
                    } else if (user.role === 'client') {
                        window.location.href = '/front-end/index.html';
                    }
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                    showLoggedInUser(user); 
                } else {
                    alert('Invalid email or password. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    });

    function showLoggedInUser(user) {
        const userName = user.name;
        myAccountLink.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i> ${userName}`;
        myAccountLink.classList.add('logged-in'); 
    }

    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('loggedInUser');
        window.location.href = '/front-end/login.html';
    });
});
