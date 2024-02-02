document.addEventListener('DOMContentLoaded', function () {
    const confirmButton = document.getElementById('confirm-button');
    const checkoutForm = document.getElementById('checkout-form');
    const productList = document.getElementById('product-list');
    const subtotalElement = document.getElementById('subtotal');

    confirmButton.addEventListener('click', function () {
        const formData = new FormData(checkoutForm);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        const productListItems = productList.querySelectorAll('li');
        const products = [];
        productListItems.forEach(item => {
            const parts = item.textContent.split(' × ');
            const name = parts[0];
            const quantity = parseInt(parts[1]);
            const price = parseFloat(parts[2]);
            products.push({ name, quantity, price });
        });

        const subtotal = parseFloat(subtotalElement.textContent);

        jsonData.products = products;
        jsonData.subtotal = subtotal;

        fetch('http://localhost:4000/Cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save data');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data saved successfully:', data);
            alert('Your details have been saved successfully.');
            window.location.href = 'order-success.html';

        })
        .catch(error => {
            console.error('Error saving data:', error);
            alert('Failed to save your details. Please try again later.');
        });
    });
});
