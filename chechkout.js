async function fetchPanierData() {
    try {
        const response = await fetch('json/panier.json');
        const jsonData = await response.json();
        return jsonData.shoppingCart; 
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
    }
}

const user = JSON.parse(localStorage.getItem('loggedInUser'));

document.querySelector('[name="field-name"]').value = user.name;
document.querySelector('[name="field-email"]').value = user.email;

fetchPanierData()
    .then(shoppingCart => {
        const productList = document.getElementById('product-list');
        let subtotal = 0;

        shoppingCart.forEach(product => {
            const productHTML = `<li>${product.name} × ${product.quantity} <span>${product.totalPrice.toFixed(2)}TND</span></li>`;
            productList.innerHTML += productHTML;
            subtotal += product.totalPrice;
        });

        const subtotalElement = document.getElementById('subtotal');
        subtotalElement.textContent = `${subtotal.toFixed(2)}TND`;

        const totalElement = document.getElementById('total');
        totalElement.textContent = `${subtotal.toFixed(2)}TND`;
    })
    .catch(error => {
        console.error('Error fetching cart data:', error);
    });
