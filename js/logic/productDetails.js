function loadProductDetails(id) {
    $.get(
        "http://localhost:8080/wear/" + id + "/details",
        function (product) {
            $("#product-styling").attr("href", "/css/product-page.css");

            let mainContainer = document.getElementById("main-container");
            mainContainer.innerHTML = "";

            let smallContainer = document.createElement("div");
            smallContainer.classList.add("small-container");
            smallContainer.classList.add("single-product");

            mainContainer.appendChild(smallContainer);

            let productRow = document.createElement("div");
            productRow.classList.add("product-row");

            smallContainer.appendChild(productRow);

            let productPictures = document.createElement("div");
            productPictures.classList.add("col-2");

            let productDetails = document.createElement("div");
            productDetails.classList.add("col-2");

            productRow.appendChild(productPictures);
            productRow.appendChild(productDetails);

            let mainPicture = document.createElement("img");
            productPictures.appendChild(mainPicture);


            let smallImgRow = document.createElement("div");
            smallImgRow.classList.add("small-img-row");
            productPictures.appendChild(smallImgRow);



            // <------------- PRODUCT INTIALIZE ------------->

            function productInit(colorId) {
                $('.small-img-col').remove()
                $('small-img').remove()

                let chosenColor = product.colors[colorId]

                let mainPictureUrl = chosenColor.pictures[0].url;
                mainPicture.setAttribute("src", mainPictureUrl);



                chosenColor.pictures.forEach((picture) => {
                    let smallImgCol = document.createElement("div");
                    smallImgCol.classList.add("small-img-col");

                    let smallPicture = document.createElement("img");
                    smallPicture.classList.add("small-img");
                    smallPicture.setAttribute("src", picture.url);

                    smallPicture.onclick = function () {
                        mainPicture.src = smallPicture.src;
                    };

                    smallImgCol.appendChild(smallPicture);
                    smallImgRow.appendChild(smallImgCol);
                });



                productDetails.innerHTML = "<p>HOME / WEAR</p>\n" +
                    "            <h1>" + product.name + " - " + chosenColor.colorName + "</h1>\n" +
                    "            <h4>$" + chosenColor.price.toFixed(2) + "</h4>\n" +
                    '            <div class="product-options">\n' +
                    '              <select id="sizes">\n' +
                    "              </select>\n" +
                    '              <input type="number" value="1" />\n' +
                    "            </div>\n" +
                    '            <div id="colors" class="colors-available"></div>' +
                    '            <a href="" class="btn">Add to cart</a>\n' +
                    "            <div class='product-description'>" +
                    "               <h3>Product Details</h3>\n" +
                    "               <br />\n" +
                    "               <p>" + product.description + "</p>\n" +
                    "            </div>"


                let availableSizes = document.getElementById('sizes')
                console.log(chosenColor.sizes)

                chosenColor.sizes.forEach(size => {

                    let sizeOption = document.createElement('option')
                    sizeOption.innerHTML = size.name

                    availableSizes.appendChild(sizeOption)
                })


                let availableColors = document.getElementById('colors')
                availableColors.classList.add('colors-available')
                product.colors.forEach((color, index) => {
                    let colorOption = document.createElement('div')
                    colorOption.classList.add('color')
                    availableColors.appendChild(colorOption)
                    $('.color').eq(index).css('background-color', color.colorCode)




                    colorOption.onmouseover = function () {
                        $('.color').eq(index).css('outline', ' 3.5px solid ' + color.colorCode)
                        $('.color').eq(index).css('outline-offset', '3px')
                    }

                    colorOption.onmouseout = function () {
                        $('.color').eq(index).css('outline', 'none')
                    }

                    console.log(color.colorCode + ' ' + color.colorName)

                    colorOption.onclick = function () {

                        productInit(index)

                    }
                })

                let colorOptions = document.querySelectorAll('.color')
                colorOptions[colorId].classList.add('chosen')

                $('.chosen').css('box-shadow', ' 0 0 0 3px white, ' + '0 0 0 8px' + chosenColor.colorCode)
            }

            productInit(0);



            //     .forEach(size => function () {

            //     console.log(size)

            // })

            //     "          </div>\n" +
            //     "        </div>\n" +
            //     "      </div>\n" +
            //     "\n" +
            //     "      <!-- Carousel wear -->\n" +
            //     '      <div class="carousel-container">\n' +
            //     '        <div class="carousel-header">\n' +
            //     "          <p>\n" +
            //     '            <span class="wear-mover">&#139;</span>\n' +
            //     "          </p>\n" +
            //     '          <h1 class="carousel-name">Related Products</h1>\n' +
            //     "          <p>\n" +
            //     '            <span class="wear-mover">&#155;</span>\n' +
            //     "          </p>\n" +
            //     "        </div>\n" +
            //     '        <section class="products">\n' +
            //     '          <div class="product">\n' +
            //     "            <picture>\n" +
            //     '              <img src="/pictures/wear1.jpg" alt="" />\n' +
            //     "            </picture>\n" +
            //     '            <div class="details">\n' +
            //     "              <p>\n" +
            //     "                <b>Product One</b><br />\n" +
            //     "                <small>New arrival</small>\n" +
            //     "              </p>\n" +
            //     "              <samp>45.00$</samp>\n" +
            //     "            </div>\n" +
            //     '            <div class="button">\n' +
            //     '              <p class="star">\n' +
            //     "                <strong>&star;</strong>\n" +
            //     "                <strong>&star;</strong>\n" +
            //     "                <strong>&star;</strong>\n" +
            //     "                <strong>&star;</strong>\n" +
            //     "                <strong>&star;</strong>\n" +
            //     "              </p>\n" +
            //     '              <a href="#">Buy</a>\n' +
            //     "            </div>\n" +
            //     "          </div>\n" +
            //     "        </section>\n" +
            //     "      </div>";
        }
    )
        .done(function () { })
        .fail(function () {
            alert("failed");
        });
}
