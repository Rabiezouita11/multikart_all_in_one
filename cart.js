
document.addEventListener("DOMContentLoaded", async function () {
  await updatePanierPreview();
});

async function updatePanierPreview() {
  try {
    const panierData = await fetch("http://localhost:3000/shoppingCart").then(
      (response) => response.json()
    );
    const cartTableBody = document.querySelector(".cart-table tbody");
    const totalPriceElement = document.getElementById("totalPrice");
    const checkoutButton = document.querySelector(".btn-checkout"); 

    cartTableBody.innerHTML = "";

    if (panierData.length === 0) {
     
      if (totalPriceElement) {
        totalPriceElement.textContent = "0.00TND";
      }

      if (checkoutButton) {
        checkoutButton.style.display = "none";
      }
    } else {
      panierData.forEach((item) => {
        const cartItemRow = document.createElement("tr");
        cartItemRow.innerHTML = `
                    <td><img src="${item.imageFront}" alt="${
          item.name
        }" class="img-fluid"></td>
                    <td>${item.name}</td>
                    <td>${item.price.toFixed(2)} TND</td>
                    <td>
                    <input type="number" value="${
                      item.quantity
                    }" min="1" onchange="updateQuantity('${
          item.id
        }', parseInt(this.value, 10))">
                    </td>
                    <td>
                        <button onclick="removeFromCart('${
                          item.id
                        }')" class="btn btn-danger btn-sm">Remove</button>
                    </td>
                    <td>${item.totalPrice.toFixed(2)}TND</td>
                `;
        cartTableBody.appendChild(cartItemRow);
      });
     
      const totalPrice = panierData.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      if (totalPriceElement) {
        totalPriceElement.textContent = `${totalPrice.toFixed(2)}TND`;
      }

    
    }
  } catch (error) {
    console.error("Error updating panier preview:", error);
  }
}

const removeFromCartApi = async (itemId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/shoppingCart/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove item from cart.");
    }

    return response.json();
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

const removeFromCart = async (itemId) => {

  const response = await removeFromCartApi(itemId);

  // Update the cart preview after the item is removed
  updatePanierPreview();
};

const updateQuantityApi = async (itemId, newQuantity) => {
  try {
    const response = await fetch(
      `http://localhost:3000/shoppingCart/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: newQuantity,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to update quantity:",
        response.status,
        response.statusText
      );
      throw new Error("Failed to update quantity.");
    }

    const updatedItem = await response.json();
    updatedItem.totalPrice = updatedItem.price * newQuantity;

    await updateTotalPriceOnServer(itemId, updatedItem.totalPrice);

    return updatedItem;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error; 
  }
};

const updateTotalPriceOnServer = async (itemId, newTotalPrice) => {
  try {
    const response = await fetch(
      `http://localhost:3000/shoppingCart/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice: newTotalPrice,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to update totalPrice on server:",
        response.status,
        response.statusText
      );
      throw new Error("Failed to update totalPrice on server.");
    }
  } catch (error) {
    console.error("Error updating totalPrice on server:", error);
    throw error;
  }
};

const updateQuantity = async (itemId, newQuantity) => {

  const response = await updateQuantityApi(itemId, newQuantity);

  updatePanierPreview();
};

function redirectUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "login.html"; 
    return; 
  }else{
    window.location.href = "checkout.html"; 
  }
}
