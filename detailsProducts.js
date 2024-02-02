document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = parseFloat(urlParams.get('price'));
    const imageFront = urlParams.get('imageFront');
    const productSlick = document.querySelector('.product-slick');


    document.getElementById('productName').innerText = productName;
    document.getElementById('productPrice').innerText = `${productPrice.toFixed(2)}TND`;
    const imageContainer = document.createElement('div');
    imageContainer.innerHTML = `<img src="${imageFront}" alt="" class="img-fluid blur-up lazyload image_zoom_cls-0">`;

    productSlick.appendChild(imageContainer);
  
  

   
});
