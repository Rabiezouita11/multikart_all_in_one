document.addEventListener("DOMContentLoaded", function() {
    // Fetch product details from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = parseFloat(urlParams.get('price'));
    const imageFront = urlParams.get('imageFront');
    const productSlick = document.querySelector('.product-slick');


    // Populate product details in the HTML
    document.getElementById('productName').innerText = productName;
    document.getElementById('productPrice').innerText = `${productPrice.toFixed(2)}TND`;
    const imageContainer = document.createElement('div');
    imageContainer.innerHTML = `<img src="${imageFront}" alt="" class="img-fluid blur-up lazyload image_zoom_cls-0">`;

    // Append the image container to the product-slick container
    productSlick.appendChild(imageContainer);
    // Add front and back images dynamically
  
  

    // Additional product details can be populated similarly
    // For example, ratings, color variants, size selection, etc.
});
