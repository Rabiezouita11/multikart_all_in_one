document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:8081/front-end/json/Demande.json')
        .then(response => response.json())
        .then(data => {
            const productTableBody = document.getElementById('productTableBody');
            
            productTableBody.innerHTML = '';

            data.Cart.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry['field-name']}</td>
                    <td>${entry['field-email']}</td>
                    <td>${entry['field-address']}</td>
                    <td>${entry['subtotal']}TND</td>
                    

                `;
                productTableBody.appendChild(row);

          
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
