document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:8081/front-end/json/products.json') // Updated fetch URL
        .then(response => response.json())
        .then(products => {
            const productTableBody = document.getElementById('productTableBody');
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <img src="${product.imageFront}" alt="${product.name}">
                    </td>
                    <td>${product.name}</td>
                    <td>${product.price.toFixed(2)}TND</td>
                `;
                productTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
});
