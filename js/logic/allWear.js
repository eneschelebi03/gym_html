$(document).ready(function () {
    loadAllProducts();
});

function loadAllProducts() {
    $.get("http://localhost:8080/products/wear/all", function (responseJson) {
        let productsContainer = document.getElementById("products");

        let displayPoducts = [];

        $.each(responseJson, function (index, product) {
            let productDisplay = document.createElement("div");

            productDisplay.innerHTML =
                "<picture>\n" +
                '                <img src="' +
                product.pictureUrl +
                '"  alt=""/>\n' +
                "            </picture>\n" +
                '            <div class="details">\n' +
                "                <p>\n" +
                "                    <b>" +
                product.name +
                "</b><br/>\n" +
                "                    <small>New arrival</small>\n" +
                "                </p>\n" +
                '                <p class="star">\n' +
                "                    <strong>&star;</strong>\n" +
                "                    <strong>&star;</strong>\n" +
                "                    <strong>&star;</strong>\n" +
                "                    <strong>&star;</strong>\n" +
                "                    <strong>&star;</strong>\n" +
                "                </p>\n" +
                '                <div class="description">' +
                product.description +
                "</div>" +
                "            </div>\n" +
                '            <div class="buy">\n' +
                "                <span>$" +
                product.price.toFixed(2) +
                "</span>\n" +
                '                <a class="buy-button" href="#">Buy</a>\n' +
                "            </div>";

            productDisplay.classList.add("product");
            productsContainer.append(productDisplay);

            productDisplay.onclick = function () {

                loadProductDetails(product.id)
            }

        });


    })
        .done(function () { })
        .fail(function () {
            alert("failed");
        });
}


