document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("productTableBody").addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("btn-primary")) {
        const productId = target.closest("tr").dataset.productId;
        console.log(productId)
        editProduct(productId);
    } else if (target.classList.contains("btn-danger")) {
        const productId = target.closest("tr").dataset.productId;
        deleteProduct(productId);
    }
});
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
              affichageProducts();
              const addProductModal = new bootstrap.Modal(
                  document.getElementById("addProductModal")
              );
              addProductModal.hide();
              document.getElementById("productName").value = "";
              document.getElementById("productCategory").value = "";
              document.getElementById("productPrice").value = "";
          })
          .catch((error) => {
              console.error("Error saving product:", error);
              alert("Failed to add product. Please try again later.");
          });
  });

  function affichageProducts() {
      fetch("http://localhost:5000/products")
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Failed to fetch products");
              }
              return response.json();
          })
          .then((products) => {
              const productTableBody = document.getElementById("productTableBody");
              productTableBody.innerHTML = ""; 
              console.log(products);
              products.forEach((product) => {
                const row = `
                <tr data-product-id="${product.id}" data-product-name="${product.name}" data-product-category="${product.category}" data-product-price="${product.price.toFixed(2)}">
                    <td>
                        <img src="${product.imageFront}" alt="${product.name}">
                    </td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.price.toFixed(2)}TND</td>
                    <td>
                        <button class="btn btn-primary">Edit</button>
                        <button class="btn btn-danger">Delete</button>
                    </td>
                </tr>
            `;
                  productTableBody.innerHTML += row;
              });
          })
          .catch((error) => {
              console.error("Error fetching products:", error);
          });
  }

  affichageProducts();

  async function editProduct(productId) {
    try {
        const response = await fetch(`http://localhost:5000/products/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product details");
        }
        const product = await response.json();
        
        const editProductModal = new bootstrap.Modal(document.getElementById("editProductModal"));

        document.getElementById("editProductName").value = product.name;
        document.getElementById("editProductCategory").value = product.category;
        document.getElementById("editProductPrice").value = product.price.toFixed(2);

        document.getElementById("editProductId").value = productId;

        editProductModal.show();

        editProductModal._element.addEventListener('shown.bs.modal', function () {
            const updateForm = document.getElementById("editProductForm");
            updateForm.addEventListener("submit", (event) => {
                event.preventDefault();
                updateProduct(productId);
            });
        });
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}



async function updateProduct(productId) {
  const productName = document.getElementById("editProductName").value;
  const productCategory = document.getElementById("editProductCategory").value;
  const productPrice = parseFloat(document.getElementById("editProductPrice").value);

  const updatedProduct = {
      name: productName,
      category: productCategory,
      price: productPrice,
  };

  try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
          method: "PATCH",  
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
          throw new Error("Failed to update product");
      }

      const data = await response.json();
      console.log("Product updated successfully:", data);

      const editProductModal = new bootstrap.Modal(document.getElementById("editProductModal"));
      editProductModal.hide();

      affichageProducts();

      location.reload();

  } catch (error) {
      console.error("Error updating product:", error);
  }
}




  function deleteProduct(productId) {
      const confirmation = confirm("Are you sure you want to delete this product?");
      if (!confirmation) {
          return;
      }

      fetch(`http://localhost:5000/products/${productId}`, {
          method: "DELETE",
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Failed to delete product");
              }
              return response.json();
          })
          .then((data) => {
              console.log("Product deleted successfully:", data);
              affichageProducts();
          })
          .catch((error) => console.error("Error deleting product:", error));
  }
});
