document.addEventListener("DOMContentLoaded", function() {
    const logoutAdminLink = document.getElementById('logoutAdmin');

    logoutAdminLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Perform logout actions here
        logoutAdmin();
    });

    // Function to perform logout actions
    function logoutAdmin() {
        // Perform any cleanup actions (e.g., clearing local storage, redirecting to login page, etc.)
        localStorage.removeItem('loggedInUser');
        window.location.href = '/front-end/login.html'; // Redirect to login page
    }
});
