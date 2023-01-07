function loadTopSupplements() {
    $.get("http://localhost:8080/topSupps", function (responseJson) {
        let topSuppsCarousel = document.getElementById("topSupplements");
        let productClass = 'supp-product'

       createProducts(topSuppsCarousel, responseJson, productClass);

    }).fail(function () {
        alert('failed')
    })
}

function loadTopWear() {
    $.get("http://localhost:8080/topWear", function (responseJson) {
        let topWearCarousel = document.getElementById("topWear");
        let productClass = 'product'

        createProducts(topWearCarousel, responseJson, productClass);

    }).fail(function () {
        alert('failed')
    })
}

function createProducts(topProductsCarousel, responseJson, productClass) {$.each(responseJson, function (index, product) {
    let topProduct = document.createElement('div')

    topProduct.innerHTML = '<picture>\n' +
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

    topProduct.classList.add(productClass)
    topProductsCarousel.append(topProduct)
})}