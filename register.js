document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(registrationForm);
        const userData = {};

        formData.forEach((value, key) => {
            userData[key] = value;
        });

        // Make a POST request to JSON Server
        try {
            const response = await fetch('http://127.0.0.1:8080/json/users.json', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('User registered successfully:', data);
            // You can redirect or perform other actions after registration
        } catch (error) {
            console.error('Error registering user:', error);
        }
    });
});
