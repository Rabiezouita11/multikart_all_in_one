document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from demande.json
    fetch('http://127.0.0.1:8081/front-end/json/Demande.json')
        .then(response => response.json())
        .then(data => {
            const productTableBody = document.getElementById('productTableBody');
            
            // Clear existing table rows
            productTableBody.innerHTML = '';

            // Iterate through each entry in the "Cart" array
            data.Cart.forEach(entry => {
                // Create a table row for each entry
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry['field-name']}</td>
                    <td>${entry['field-email']}</td>
                    <td>${entry['field-address']}</td>
                    <td>${entry['subtotal']}TND</td>
                    

                `;
                productTableBody.appendChild(row);

                // Iterate through the products in the current entry
                

                // Create a subtotal row for each entry
          
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
