function loadTopSupplements() {
    $.get("http://localhost:8080/products/topSupps", function (responseJson) {
        let topSuppsCarousel = document.getElementById("topSupplements");
        let productClass = 'supp-product'

        createProducts(topSuppsCarousel, responseJson, productClass);

    }).fail(function () {
        alert('failed')
    })
}

function loadTopWear() {
    $.get("http://localhost:8080/products/topWear", function (responseJson) {
        let topWearCarousel = document.getElementById("topWear");
        let productClass = 'product'

        createProducts(topWearCarousel, responseJson, productClass);

    }).fail(function () {
        alert('failed')
    })
}

function loadRecommendedProducts(productId) {
    $.get("http://localhost:8080/products/wear/" + productId + "/related/", function (responseJson) {
        let recommendedProductsCarousel = document.getElementById('recommended-products');
        let productClass = 'product'

        createProducts(recommendedProductsCarousel, responseJson, productClass);

    }).fail(function () {
        alert('failed')
    })
}

function createProducts(carousel, responseJson, productClass) {
    $.each(responseJson, function (index, product) {
        let carouselProduct = document.createElement('div')

        carouselProduct.innerHTML = '<picture>\n' +
            '                <img src="' + product.pictureUrl + '"  alt=""/>\n' +
            '            </picture>\n' +
            '            <div class="details">\n' +
            '                <p>\n' +
            '                    <b>' + product.name + '</b><br/>\n' +
            '                    <small>New arrival</small>\n' +
            '                </p>\n' +
            '                <p class="star">\n' +
            '                    <strong>&star;</strong>\n' +
            '                    <strong>&star;</strong>\n' +
            '                    <strong>&star;</strong>\n' +
            '                    <strong>&star;</strong>\n' +
            '                    <strong>&star;</strong>\n' +
            '                </p>\n' +
            '            </div>\n' +
            '            <div class="buy">\n' +
            '                <span>' + product.price.toFixed(2) + '$</span>\n' +
            '                <a href="#">Buy</a>\n' +
            '            </div>'

        carouselProduct.classList.add(productClass)
        carousel.append(carouselProduct)

        carouselProduct.onclick = function () {
            loadProductDetails(product.id)
        }
    })
}