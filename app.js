document.addEventListener("DOMContentLoaded", async function () { // Fetch products from the JSON file

    await updatePanierPreview();


    fetch('json/products.json').then(response => response.json()).then(products => { // Get the product container
        const productContainer = document.getElementById('product-container');

        // Iterate through the products and create HTML for each product
        products.forEach(product => {
            const productHTML = `
                <div class="col-md-3 mb-3">
                <div class="product-4 product-m no-arrow">
                            <div class="product-box">
                                <div class="img-wrapper">
                                    <div class="front">
                                        <a href="product-page(no-sidebar).html"><img src="${
                product.imageFront
            }"
                                                class="img-fluid blur-up lazyload bg-img" alt=""></a>
                                    </div>
                                    <div class="back">
                                        <a href="product-page(no-sidebar).html"><img src="${
                product.imageBack
            }"
                                                class="img-fluid blur-up lazyload bg-img" alt=""></a>
                                    </div>
                                    <div class="cart-info cart-wrap">
                                        <button onclick="addToCart('${
                product.name
            }', ${
                product.price
            }, '${
                product.imageFront
            }')" title="Add to cart">
                                            <i class="ti-shopping-cart"></i>
                                        </button>
                                        <a href="javascript:void(0)" title="Add to Wishlist">
                                            <i class="ti-heart" aria-hidden="true"></i>
                                        </a>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view" title="Quick View">
                                            <i class="ti-search" aria-hidden="true"></i>
                                        </a>
                                        <a href="compare.html" title="Compare">
                                            <i class="ti-reload" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="product-detail">
                                    <div class="rating"><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i
                                            class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                                    </div>
                                    <a href="product-page(no-sidebar).html">
                                        <h6>${
                product.name
            }</h6>
                                    </a>
                                    <h4>${
                product.price
            } TND</h4>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            // Append the product HTML to the product container
            productContainer.innerHTML += productHTML;
        });
    }).catch(error => console.error('Error fetching products:', error));
});
async function updatePanierPreview() {
    try {
        const panierData = await fetch('http://localhost:3000/shoppingCart').then(response => response.json());
        const cartPreview = document.querySelector('.shopping-cart');
        const cartCountElement = document.querySelector('.cart_qty_cls');
        const cartTotalElement = document.querySelector('.cart-total'); // <-- Add this line
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        const cartTotalNotFound = document.querySelector('.cart-total-not-found'); // <-- Add this line

        // Clear existing cart items
        cartPreview.innerHTML = '';

        if (panierData.length === 0) {
            // Display a message when the cart is empty
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'block';
            }

            // Add "Cart total element not found." message inside a <li>
            const cartTotalNotFoundItem = document.createElement('li');
            cartTotalNotFoundItem.innerHTML = `<div class="total"><h5>${cartTotalNotFound.textContent}</h5></div>`;
            cartPreview.appendChild(cartTotalNotFoundItem);

            // Hide the cart total element and show the "not found" message
            if (cartTotalElement) {
                cartTotalElement.style.display = 'none';
            }
            if (cartTotalNotFound) {
                cartTotalNotFound.style.display = 'block';
            }
        } else {
            // Update the cart preview with items from panier.json
            panierData.forEach(item => {
                const cartItem = document.createElement('li');
                cartItem.innerHTML = `
                    <div class="media">
                        <a href="#"><img alt="" class="me-3" src="${item.imageFront}"></a>
                        <div class="media-body">
                            <a href="#">
                                <h4>${item.name}</h4>
                            </a>
                            <h4><span>${item.quantity} x ${item.price.toFixed(2)} TND</span></h4>
                        </div>
                    </div>
                    <div class="close-circle"><a href="#" onclick="removeFromCart('${item.name}')"><i class="fa fa-times" aria-hidden="true"></i></a></div>
                `;
                cartPreview.appendChild(cartItem);
            });

            // Calculate and display the total price
            const totalPrice = panierData.reduce((total, item) => total + item.totalPrice, 0);
            cartPreview.innerHTML += `<li><div class="total"><h5>subtotal : <span>${totalPrice.toFixed(2)} TND</span></h5></div></li>`;

            // Hide the empty cart message
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'none';
            }

            // Show the cart total element and hide the "not found" message
            if (cartTotalElement) {
                cartTotalElement.style.display = 'block';
            }
            if (cartTotalNotFound) {
                cartTotalNotFound.style.display = 'none';
            }
        }

        // Update the cart quantity
        const totalQuantity = calculateTotalQuantity(panierData);
        cartCountElement.textContent = totalQuantity.toString();

    } catch (error) {
        console.error('Error updating panier preview:', error);
    }
}







// Shopping Cart Logic
let shoppingCart = [];
const cartContainer = document.querySelector('.cart-table tbody');

async function addToCart(productName, price, imageFront) { // Check if the product is already in the cart
   
    await clearPanier();

    const existingProduct = shoppingCart.find(item => item.name === productName);

    if (existingProduct) { // If the product is already in the cart, update quantity and price
        existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
    } else { // If the product is not in the cart, add it
        shoppingCart.push({
            name: productName,
            price: price,
            quantity: 1,
            totalPrice: price,
            imageFront: imageFront
        });
    }
    // Update the cart icon with the total quantity
  
    //    updatePanierPreview();
    await saveShoppingCartToServer()
    await updatePanierPreview();


}
async function saveShoppingCartToServer() {
    console.log(shoppingCart)
    try { // Create an array to store the promises for each item

        const savePromises = shoppingCart.map(item => {
            return fetch('http://localhost:3000/shoppingCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
        });

        // Wait for all the promises to resolve
        const responses = await Promise.all(savePromises);

        // Check if all responses are okay
        const allResponsesOkay = responses.every(response => response.ok);

        if (allResponsesOkay) {
            console.log('Shopping cart saved to server successfully.');
        } else {
            console.error('Failed to save shopping cart to server.');
        }
    } catch (error) {
        console.error('Error saving shopping cart to server:', error);
    }
}

async function clearPanier() {
    try {
        const panierResponse = await fetch('http://localhost:3000/shoppingCart');
        const panierData = await panierResponse.json();

        // Delete each item in panier.json
        const deletePromises = panierData.map(item => {
            const deleteUrl = `http://localhost:3000/shoppingCart/${item.id}`;
            return fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });

        // Wait for all the delete promises to resolve
        const deleteResponses = await Promise.all(deletePromises);

        // Check if all responses are okay
        const allResponsesOkay = deleteResponses.every(response => response.ok);

        if (allResponsesOkay) {
            console.log('Panier cleared successfully.');
        } else {
            console.error('Failed to clear panier.');
        }
    } catch (error) {
        console.error('Error clearing panier:', error);
    }
}








function updateCartIcon() {
    const cartQtyElement = document.querySelector('.cart_qty_cls');
    cartQtyElement.textContent = calculateTotalQuantity();
}

function updateCartPreview() {
    const cartPreview = document.querySelector('.shopping-cart');
    const cartTotalElement = document.querySelector('.total span');

    // Clear existing cart items
    cartPreview.innerHTML = '';

    // Populate the cart items
    shoppingCart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
               <div class="media">
                   <a href="#"><img alt="" class="me-3" src="${
            item.imageFront
        }"></a>
                   <div class="media-body">
                       <a href="#">
                           <h4>${
            item.name
        }</h4>
                       </a>
                       <h4><span>${
            item.quantity
        } x  ${
            item.price.toFixed(2)
        } TND</span></h4>
                   </div>
               </div>
               <div class="close-circle"><a href="#" onclick="removeFromCart('${
            item.name
        }')"><i class="fa fa-times" aria-hidden="true"></i></a></div>
           `;
        cartPreview.appendChild(cartItem);
    });

    // Calculate and display the total price
    const totalPrice = shoppingCart.reduce((total, item) => total + item.totalPrice, 0);
    cartPreview.innerHTML += `<li><div class="total"><h5>subtotal : <span>${
        totalPrice ?. toFixed(2)
    }TND</span></h5></div></li>`;
    if (cartTotalElement) {
        cartTotalElement.textContent = `${
            totalPrice ?. toFixed(2)
        }TND`;
    } else {
        console.error('Cart total element not found.');
    }
}

function removeFromCart(productName) { // Remove the item from the shopping cart
    shoppingCart = shoppingCart.filter(item => item.name !== productName);

    // Update the cart icon with the total quantity
    updateCartIcon();

    // Update the shopping cart preview
    updateCartPreview();
}

// function calculateTotalQuantity() {
//     return shoppingCart.reduce((total, item) => total + item.quantity, 0);
// }
function calculateTotalQuantity(panierData) {
    return panierData.reduce((total, item) => total + item.quantity, 0);
}