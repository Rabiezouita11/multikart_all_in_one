// cart.js

document.addEventListener("DOMContentLoaded", async function () {
    await updatePanierPreview();
});

async function updatePanierPreview() {
    try {
        const panierData = await fetch('http://localhost:3000/shoppingCart').then(response => response.json());
        const cartTableBody = document.querySelector('.cart-table tbody');
        const totalPriceElement = document.getElementById('totalPrice');

        // Clear existing cart items
        cartTableBody.innerHTML = '';

        if (panierData.length === 0) {
            // Handle the case when the cart is empty
            // ...

            // Set the total price to 0 when the cart is empty
            if (totalPriceElement) {
                totalPriceElement.textContent = '0.00TND';
            }
        } else {
            // Update the cart preview with items from panier.json
            panierData.forEach(item => {
                const cartItemRow = document.createElement('tr');
                cartItemRow.innerHTML = `
                    <td><img src="${item.imageFront}" alt="${item.name}" class="img-fluid"></td>
                    <td>${item.name}</td>
                    <td>${item.price.toFixed(2)} TND</td>
                    <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', parseInt(this.value, 10))">
                    </td>
                    <td>
                        <button onclick="removeFromCart('${item.id}')" class="btn btn-danger btn-sm">Remove</button>
                    </td>
                    <td>${item.totalPrice.toFixed(2)}TND</td>
                `;
                cartTableBody.appendChild(cartItemRow);
            });

            // Calculate and display the total price
            const totalPrice = panierData.reduce((total, item) => total + item.totalPrice, 0);
            if (totalPriceElement) {
                totalPriceElement.textContent = `${totalPrice.toFixed(2)}TND`;
            }
        }
    } catch (error) {
        console.error('Error updating panier preview:', error);
    }
}

// Function to call the API and remove an item from the cart
const removeFromCartApi = async (itemId) => {
    try {
        const response = await fetch(`http://localhost:3000/shoppingCart/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove item from cart.');
        }

        return response.json();
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};

// Function to handle removing an item from the cart
const removeFromCart = async (itemId) => {
    // Assuming you have some logic here to confirm with the user before removing

    // Call the API to remove the item from the cart
    const response = await removeFromCartApi(itemId);

    // Update the cart preview after the item is removed
    updatePanierPreview();
};

// Function to call the API and update the quantity of an item in the cart
// Function to call the API and update the quantity of an item in the cart
const updateQuantityApi = async (itemId, newQuantity) => {
    try {
        const response = await fetch(`http://localhost:3000/shoppingCart/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: newQuantity,
            }),
        });

        if (!response.ok) {
            // Log the error details or handle it appropriately
            console.error('Failed to update quantity:', response.status, response.statusText);
            throw new Error('Failed to update quantity.');
        }

        const updatedItem = await response.json();
        updatedItem.totalPrice = updatedItem.price * newQuantity;

        // Update the totalPrice in panier.json on the server
        await updateTotalPriceOnServer(itemId, updatedItem.totalPrice);

        return updatedItem;
    } catch (error) {
        // Log the error details or handle it appropriately
        console.error('Error updating quantity:', error);
        throw error; // Propagate the error to the calling function
    }
};

const updateTotalPriceOnServer = async (itemId, newTotalPrice) => {
    try {
        const response = await fetch(`http://localhost:3000/shoppingCart/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                totalPrice: newTotalPrice,
            }),
        });

        if (!response.ok) {
            console.error('Failed to update totalPrice on server:', response.status, response.statusText);
            throw new Error('Failed to update totalPrice on server.');
        }
    } catch (error) {
        console.error('Error updating totalPrice on server:', error);
        throw error;
    }
};





// Function to handle updating the quantity of an item in the cart
    const updateQuantity = async (itemId, newQuantity) => {
        // Assuming you have some logic here to validate the new quantity

        // Call the API to update the quantity of the item in the cart
        const response = await updateQuantityApi(itemId, newQuantity);

        // Update the cart preview after the quantity is updated
        updatePanierPreview();
    };
