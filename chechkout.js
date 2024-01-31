async function fetchPanierData() {
    try {
        const response = await fetch('json/panier.json');
        const jsonData = await response.json();
        return jsonData.shoppingCart; // Access the shoppingCart property
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
    }
}

// Retrieve data from localStorage
const user = JSON.parse(localStorage.getItem('loggedInUser'));

// Display user data in the form fields
document.querySelector('[name="field-name"]').value = user.name;
document.querySelector('[name="field-email"]').value = user.email;

// Call the function to fetch cart data and display it in the page
fetchPanierData()
    .then(shoppingCart => {
        const productList = document.getElementById('product-list');
        let subtotal = 0;

        // Create HTML content corresponding to the cart data
        shoppingCart.forEach(product => {
            const productHTML = `<li>${product.name} × ${product.quantity} <span>${product.totalPrice.toFixed(2)}TND</span></li>`;
            productList.innerHTML += productHTML;
            subtotal += product.totalPrice;
        });

        // Display subtotal
        const subtotalElement = document.getElementById('subtotal');
        subtotalElement.textContent = `${subtotal.toFixed(2)}TND`;

        // Calculate and display total
        const totalElement = document.getElementById('total');
        totalElement.textContent = `${subtotal.toFixed(2)}TND`;
    })
    .catch(error => {
        console.error('Error fetching cart data:', error);
    });
