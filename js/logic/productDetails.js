function loadProductDetails(id) {
    $.get(
        "http://localhost:8080/products/wear/" + id + "/details",
        function (product) {
            $("#product-styling").attr("href", "/css/product-page.css");

            // <--------------- LAYOUT INIT --------------->
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



            // <------------- PRODUCT INIT ------------->
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



                // productDetails.innerHTML = "<p>HOME / WEAR</p>\n" +
                //     "            <h1>" + product.name + " - " + chosenColor.colorName + "</h1>\n" +
                //     "            <h4>$" + chosenColor.price.toFixed(2) + "</h4>\n" +
                //     '            <div class="product-options">\n' +
                //     '              <select id="sizes">\n' +
                //     "              </select>\n" +
                //     '              <input type="number" value="1" />\n' +
                //     "            </div>\n" +
                //     '            <div id="colors" class="colors-available"></div>' +
                //     '            <a href="" class="btn">Add to cart</a>\n' +
                //     "            <div class='product-description'>" +
                //     "               <h3>Product Details</h3>\n" +
                //     "               <br />\n" +
                //     "               <p>" + product.description + "</p>\n" +
                //     "            </div>"

                productDetails.innerHTML = "<p>HOME / WEAR</p>\n" +
                    "            <h1>" + product.name + " - " + chosenColor.colorName + "</h1>\n" +
                    "            <h4>$" + chosenColor.price.toFixed(2) + "</h4>\n" +
                    '            <span id="size-warning" class="warning">Please choose a size!</span>' +
                    '            <div id="sizes" class="product-sizes">\n' +
                    "            </div>\n" +
                    '            <div id="colors" class="colors-available"></div>' +
                    '            <span id="auth-warning" class="warning">Please register or sign in first!</span>' +
                    '            <div class="product-options">' +
                    '             <div class="quantity-input">' +
                    '              <span id="decrement" class="material-symbols-outlined">\n' +
                    '               remove\n' +
                    '              </span>' +
                    '              <input id="quantity" type="number" value="1" min="1" max="99">\n' +
                    '              <span id="increment" class="material-symbols-outlined">\n' +
                    '              add\n' +
                    '              </span>' +
                    '             </div>' +
                    '             <a id="add-to-cart-btn" class="btn">Add to cart</a>\n' +
                    '            </div>' +
                    "            <div class='product-description'>" +
                    "               <h3>Product Details</h3>\n" +
                    "               <br />\n" +
                    "               <p>" + product.description + "</p>\n" +
                    "            </div>"


                // <--------------- SIZES LOGIC --------------->
                let availableSizes = document.getElementById('sizes')
                console.log(chosenColor.sizes)

                let sizeNames = new Array();

                chosenColor.sizes.forEach(size => {
                    sizeNames.push(size.name)
                })

                sizeNames.sort(sortSizes)

                sizeNames.forEach((sizeName, index) => {


                    let sizeOption = document.createElement('span')
                    sizeOption.classList.add('size')
                    sizeOption.innerHTML = sizeName

                    availableSizes.appendChild(sizeOption)

                    sizeOption.onclick = function () {
                        $('#size-warning').css('display', 'none')
                        $('.size').removeClass('chosen')
                        sizeOption.classList.add('chosen')
                    }
                })


                // <--------------- COLORS LOGIC --------------->
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

                // <--------------- INCREMENET AND DECREMENT QUANTITY LOGIC --------------->
                let decrementButton = document.getElementById("decrement");
                let incrementButton = document.getElementById("increment");
                let quantityInput = document.getElementById("quantity");
                incrementButton.addEventListener("click", function () {
                    let increment = Number(this.previousElementSibling.value);

                    increment >= 99 ? 99 : increment++;

                    console.log(quantityInput.value)

                    quantityInput.value = increment


                });

                decrementButton.addEventListener("click", function () {
                    let decrement = Number(this.nextElementSibling.value);

                    decrement <= 1 ? 1 : decrement--;

                    quantityInput.value = decrement
                });

                quantityInput.oninput = function () {
                    var max = parseInt(this.max);

                    if (parseInt(this.value) > max) {
                        this.value = max;
                    }

                    var min = parseInt(this.min)

                    if (parseInt(this.value) < min) {
                        this.value = min;
                    }
                }

                let addToCartBtn = document.getElementById('add-to-cart-btn')
                addToCartBtn.onclick = function () {

                    try {
                        let chosenSize = document.querySelector('.size.chosen').textContent
                        let quantity = document.getElementById('quantity').value
                        addToCart(product.id, chosenColor.colorName, chosenSize, quantity)
                    }
                    catch (err) {
                        $('#size-warning').css('display', 'flex')
                        $('#sizes').css('margin-top', '25px')
                        console.log(err)
                    }

                    console.log(chosenColor.colorName)

                }
            }

            productInit(0);
            displayRecommendedProducts(product.id)









            // carouselContainer.innerHTML = '<div class="carousel-header">\n' +
            //     '          <h1 class="carousel-name">Recommended for you</h1>\n' +
            //     "        </div>\n" +
            //     '        <section class="products"></section>\n';
        }
    )
        .done(function () {
        })
        .fail(function () {
            alert("failed");
        });
}

function displayRecommendedProducts(productId) {
    let mainContainer = document.getElementById("main-container");

    let carouselContainer = document.createElement('div')
    carouselContainer.classList.add('carousel-container')


    let carouselHeader = document.createElement('header')
    carouselHeader.classList.add('carousel-header')


    let carouselName = document.createElement('h1')
    carouselName.classList.add('carousel-name')
    carouselName.textContent = 'Recommended for you'

    carouselHeader.appendChild(carouselName)
    carouselContainer.appendChild(carouselHeader)

    let prorductsSection = document.createElement('section')
    prorductsSection.classList.add('products')
    prorductsSection.id = 'recommended-products'

    console.log(prorductsSection.id)

    loadRecommendedProducts(productId)

    carouselContainer.appendChild(prorductsSection)
    mainContainer.append(carouselContainer)
}

function authWarning() {

    $('#auth-warning').css('display', 'flex')

}