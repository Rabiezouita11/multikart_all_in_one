
document.addEventListener("DOMContentLoaded", async function () {
    await updatePanierPreview();

    fetch('json/products.json')
    .then(response => response.json())
    .then(res => {
        const productContainer = document.getElementById('product-container');

        function filterProductsByLetter(letter) {
            return res.products.filter(product => product.name.toLowerCase().includes(letter.toLowerCase()));
        }

        renderProducts(res.products);

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function () {
            const searchLetter = this.value.trim();
            const filteredProducts = filterProductsByLetter(searchLetter);
            renderProducts(filteredProducts);
        });

        function renderProducts(products) {
            productContainer.innerHTML = '';

            products.forEach(product => {
                const productHTML = `
                    <div class="col-md-3 mb-3">
                    <div class="product-4 product-m no-arrow">
                                <div class="product-box">
                                    <div class="img-wrapper">
                                        <div class="front">
                                            <a href="product-page(no-sidebar).html?name=${encodeURIComponent(product.name)}&price=${product.price}&imageFront=${encodeURIComponent(product.imageFront)}&imageBack=${encodeURIComponent(product.imageBack)}"><img src="${
                    product.imageFront
                }"
                                                    class="img-fluid blur-up lazyload bg-img" alt=""></a>
                                        </div>
                                        <div class="back">
                                            <a href="product-page(no-sidebar).html?name=${encodeURIComponent(product.name)}&price=${product.price}&imageFront=${encodeURIComponent(product.imageFront)}&imageBack=${encodeURIComponent(product.imageBack)}"><img src="${
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
                                        <a href="product-page(no-sidebar).html?name=${encodeURIComponent(product.name)}&price=${product.price}&imageFront=${encodeURIComponent(product.imageFront)}&imageBack=${encodeURIComponent(product.imageBack)}">
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
    
                productContainer.innerHTML += productHTML;
            });
        }
    })
    .catch(error => console.error('Error fetching products:', error));
});
    async function filterProducts(category) {
        await updatePanierPreview();

        fetch('json/products.json')
        .then(response => response.json())
        .then(res => {
            const productContainer = document.getElementById('product-container');    
            renderProducts(res.products);
    
            function renderProducts(products) {
                productContainer.innerHTML = '';
                products.forEach(product => {
                    if (category === 'tous' || product.category === category) {
                       console.log(product)
                      const productHTML=`
                        <div class="col-md-3 mb-3">
                        <div class="product-4 product-m no-arrow">
                                    <div class="product-box">
                                        <div class="img-wrapper">
                                            <div class="front">
                                                <a href="product-page(no-sidebar).html?name=${encodeURIComponent(product.name)}&price=${product.price}&imageFront=${encodeURIComponent(product.imageFront)}&imageBack=${encodeURIComponent(product.imageBack)}"><img src="${
                        product.imageFront
                    }"
                                                        class="img-fluid blur-up lazyload bg-img" alt=""></a>
                                            </div>
                                            <div class="back">
                                                <a href="product-page(no-sidebar).html?name=${encodeURIComponent(product.name)}&price=${product.price}&imageFront=${encodeURIComponent(product.imageFront)}&imageBack=${encodeURIComponent(product.imageBack)}"><img src="${
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
                                            <a href="product-page(no-sidebar).html?name=${encodeURIComponent(product.name)}&price=${product.price}&imageFront=${encodeURIComponent(product.imageFront)}&imageBack=${encodeURIComponent(product.imageBack)}">
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
                        productContainer.innerHTML += productHTML;
                    }
                });
         
            }
         this.closeNav();
        })
        .catch(error => console.error('Error fetching products:', error));
       
    }
    function closeNav() {
        document.getElementById("mySidenav").classList.remove('open-side');
    }
async function updatePanierPreview() {
    try {
        const panierData = await fetch('http://localhost:3000/shoppingCart').then(response => response.json());
        const cartPreview = document.querySelector('.shopping-cart');
        const cartCountElement = document.querySelector('.cart_qty_cls');
        const cartTotalElement = document.querySelector('.cart-total'); 
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        const cartTotalNotFound = document.querySelector('.cart-total-not-found'); 

        cartPreview.innerHTML = '';

        if (panierData.length === 0) {
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'block';
            }

            const cartTotalNotFoundItem = document.createElement('li');
            cartTotalNotFoundItem.innerHTML = `<div class="total"><h5>${cartTotalNotFound?.textContent || 'Cart total element not found.'}</h5></div>`;
            cartPreview.appendChild(cartTotalNotFoundItem);

            if (cartTotalElement) {
                cartTotalElement.style.display = 'none';
            }
            if (cartTotalNotFound) {
                cartTotalNotFound.style.display = 'block';
            }
        } else {
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
                    <div class="close-circle">
                        <a href="#" onclick="removeFromCart('${item.id}')">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                    </div>`;
                cartPreview.appendChild(cartItem);
            });

            const totalPrice = panierData.reduce((total, item) => total + item.totalPrice, 0);
            cartPreview.innerHTML += `<li><div class="total"><h5>subtotal : <span>${totalPrice.toFixed(2)} TND</span></h5></div></li>`;

            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'none';
            }

            if (cartTotalElement) {
                cartTotalElement.style.display = 'block';
            }
            if (cartTotalNotFound) {
                cartTotalNotFound.style.display = 'none';
            }
        }

        const totalQuantity = calculateTotalQuantity(panierData);
        cartCountElement.textContent = totalQuantity.toString();

    } catch (error) {
        console.error('Error updating panier preview:', error);
    }
}





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

const removeFromCart = async (itemId) => {
    try {
        await removeFromCartApi(itemId);

        shoppingCart = await fetch('http://localhost:3000/shoppingCart').then(response => response.json());

        updatePanierPreview();
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};



let shoppingCart = [];

async function addToCart(productName, price, imageFront) {
    try {
        shoppingCart = await fetch('http://localhost:3000/shoppingCart').then(response => response.json());

        const existingProduct = shoppingCart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
        } else {
            shoppingCart.push({
                name: productName,
                price: price,
                quantity: 1,
                totalPrice: price,
                imageFront: imageFront
            });
        }
        clearPanier();
        await saveShoppingCartToServer();

        updatePanierPreview();
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}
async function saveShoppingCartToServer() {
    console.log(shoppingCart)
    try { 

        const savePromises = shoppingCart.map(item => {
            return fetch('http://localhost:3000/shoppingCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
        });

        const responses = await Promise.all(savePromises);

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

        const deletePromises = panierData.map(item => {
            const deleteUrl = `http://localhost:3000/shoppingCart/${item.id}`;
            return fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });

        const deleteResponses = await Promise.all(deletePromises);

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











// function calculateTotalQuantity() {
//     return shoppingCart.reduce((total, item) => total + item.quantity, 0);
// }
function calculateTotalQuantity(panierData) {
    return panierData.reduce((total, item) => total + item.quantity, 0);
}