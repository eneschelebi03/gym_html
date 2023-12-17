$(document).ready(function () {
	loadAllProducts();
});

// www.gympowers.link

function loadAllProducts() {
	console.log(document.cookie);

	$.get("http://localhost:8080/products/wear/all", function (responseJson) {
		let productsContainer = document.getElementById("products");

		let displayPoducts = [];

		$.each(responseJson, function (index, product) {
			let productDisplay = document.createElement("div");

			let newPrice = product.price;
            let oldPrice = product.price
			let oldPriceElement = "";

            const discount = product.discount

			if (discount) {
				oldPriceElement = `<span class="old-price">$${oldPrice.toFixed(2)}</span>`;
                newPrice = oldPrice - (oldPrice * discount / 100);
			}

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
                '               <div>' +
				"                   <span class='new-price'>$" +
				newPrice.toFixed(2) +
				"                   </span>\n" +
				oldPriceElement +
                '               </div>' +
				'                <a class="buy-button" href="#">View</a>\n' +
				"            </div>";

			productDisplay.classList.add("product");
			productsContainer.append(productDisplay);

			productDisplay.onclick = function () {
				loadProductDetails(product.id);
			};
		});
	})
		.done(function () {})
		.fail(function () {
			alert("failed");
		});
}
