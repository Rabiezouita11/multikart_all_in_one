document.addEventListener("DOMContentLoaded", function() {
    const logoutAdminLink = document.getElementById('logoutAdmin');

    logoutAdminLink.addEventListener('click', function(event) {
        event.preventDefault();
        logoutAdmin();
    });

    function logoutAdmin() {
        localStorage.removeItem('loggedInUser');
        window.location.href = '/front-end/login.html'; 
    }
});
