document.addEventListener("DOMContentLoaded", function () {
    const addProductForm = document.getElementById("addProductForm");
  
    addProductForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const productName = document.getElementById("productName").value;
      const productCategory = document.getElementById("productCategory").value;
      const productPrice = document.getElementById("productPrice").value;
  
      const productData = {
        name: productName,
        imageFront: "../assets/img/logo.png",
        imageBack: "../assets/img/logo.png",
        price: parseFloat(productPrice),
        category: productCategory,
      };
  
      // Send product data to JSON Server
      fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save product");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Product saved successfully:", data);
          alert("Product added successfully.");
          // Update the product list without reloading the page
          updateProductList();
          // Optionally, you can close the modal here
          const addProductModal = new bootstrap.Modal(
            document.getElementById("addProductModal")
          );
          addProductModal.hide();
          document.getElementById("productName").value= "";
          document.getElementById("productCategory").value="";
         document.getElementById("productPrice").value="";
        })
        .catch((error) => {
          console.error("Error saving product:", error);
          alert("Failed to add product. Please try again later.");
        });
    });
  
    // Function to update the product list
    function updateProductList() {
      fetch("http://localhost:5000/products")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((products) => {
          const productTableBody = document.getElementById("productTableBody");
          productTableBody.innerHTML = ""; // Clear existing product list
          // Loop through the products and append them to the table
          console.log(products)
          products.forEach((product) => {
            const row = `
              <tr>
              <td>
              <img src="${product.imageFront}" alt="${product.name}">
          </td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price.toFixed(2)}TND</td>
                </tr>
            `;
            productTableBody.innerHTML += row;
          });
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  
    // Initial update of product list on page load
    updateProductList();
  });
  