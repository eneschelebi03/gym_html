var productImg = document.getElementById('product-img');
var smallImgs = document.querySelectorAll('.small-img');

smallImgs.forEach(img => {
    img.onclick = function () {
        productImg.src = img.src;
    }
});