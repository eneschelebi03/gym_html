let addressSaved = false

let saveAddressBtn = document.getElementById("save-address-btn");
let editAddressBtn = document.getElementById("edit-address-btn");
let payBtn = document.getElementById("pay-btn");
let applyBtn = document.getElementById("apply-btn");
let addressForm = document.getElementById("address-form");

let details;

saveAddressBtn.onclick = function () {
    saveDetails()
}
editAddressBtn.onclick = function () {
    editDetails()
}
payBtn.onclick = function () {

    if (addressSaved) {

        if (filledPayingDetails()) {

            submitOrder()

        } 

    } else {

        saveDetails()

    }
}

function saveDetails() {

    $("#address-form input").removeAttr("readonly");
    $("#address-form-container input").css("outline", "none");
    $("#address-form-container .warning").css("display", "none");

    let address = Array.from(
        document.querySelectorAll("#address-form input")
    ).reduce(
        (acc, input) => ({
            ...acc,
            [input.name]: input.value,
        }),
        {}
    );

    if (Object.values(address).includes("")) {

        Object.values(address).forEach((value, index) => {
            console.log(index, value);
            if (value === "") {
                $("#address-form-container input")
                    .eq(index)
                    .css("outline", "hsl(0, 77%, 60%) 2px solid");
                $("#address-form-container .warning").css("display", "flex");
            }
        });

    } else {

        if (document.getElementById('chk').checked) {
            address['saveAsPersonal'] = true
        } else {
            address['saveAsPersonal'] = false
        }

        details = address;

        console.log(details)

        document.querySelectorAll("#address-form input")
            .forEach((input) => input.setAttribute("readonly", true));

        $("#chk").attr("disabled", true);

        saveAddressBtn.style.display = "none";
        $(".address-saved").css("display", "flex");

        addressSaved = true
    }
};

function editDetails() {
    $("#address-form input").removeAttr("readonly");
    $("#chk").removeAttr("disabled");

    saveAddressBtn.style.display = "inline-block";
    $(".address-saved").css("display", "none");

    addressSaved = false
}

function filledPayingDetails() {

    $("#payment-form input").removeAttr("readonly");
    $("#payment-form-container input").css("outline", "none");
    $("#payment-form-container .warning").css("display", "none");

    let payDets = Array.from(
        document.querySelectorAll("#payment-form input")
    ).reduce(
        (acc, input) => ({
            ...acc,
            [input.name]: input.value,
        }),
        {}
    );

    if (Object.values(payDets).includes("")) {

        Object.values(payDets).forEach((value, index) => {
            console.log(index, value);
            if (value === "") {
                $("#payment-form-container input")
                    .eq(index)
                    .css("outline", "hsl(0, 77%, 60%) 2px solid");
                $("#payment-form-container .warning").css("display", "flex");
            }
        });

        return false

    } else {
        console.log(payDets)

        return true
    }
}



let cartItems;

function submitOrder() {
    var cartItems = document.getElementsByClassName("detail");

    var items = []
    for (var i = 0; i < cartItems.length; i++) {

        var item = cartItems[i];
        var id = item.getElementsByTagName("span")[2].innerText;
        var quantity = item.getElementsByTagName("span")[4].innerText;

        console.log("Item id: " + id + ", Quantity: " + quantity);

        items.push({ id: id, quantity: quantity });
    }

    let email = window.sessionStorage.getItem('username')

    $.ajax({
        type: "POST",
        url: "https://www.gympowers.link/order/new?" + $.param({ email: email }),
        contentType: "application/json",
        data: JSON.stringify({ items: items, details: details }),

        success: function (response) {
            console.log(response);

            successfulOrder()
        },
        error: function (error) {
            console.error("Error sending data: " + error.message);
        }
    });
}

function successfulOrder() {
    $('html,body').scrollTop(0);
    $('#successful-order').css('height', '50px')
    $('.order-message-container').css('height', '200px')
    $('#successful-order').css('font-size', '35px')
    $('.order-message-container .material-symbols-outlined').css('font-size', '70px')
    $('.item-flex').css('display', 'none')
    $('#cart-heading').css('display', 'none')
    $('#container').css('align-items', 'center')

    getOrderDetails()
}

function getOrderDetails() {
    let email = window.sessionStorage.getItem('username')

    $.get("https://www.gympowers.link/order/current/products?" + $.param({ email: email }), function (responseJson) {

        let container = document.getElementById('container')

        let addressContainer = document.createElement('div')
        addressContainer.classList.add('address-container')

        addressContainer.innerHTML = '<div>' + responseJson.address.address + '</div>' +
            '       <div>' + responseJson.address.city + ', ' + responseJson.address.postCode + '</div>' +
            '       <div>' + responseJson.address.country + '</div>'

        container.appendChild(addressContainer)

        let orderItemsContainer = document.createElement('div')
        orderItemsContainer.classList.add('order-items-container')

        let total = 0;

        console.log(responseJson.orderItems)

        $.each(responseJson.orderItems, function (index, orderItem) {
            total += orderItem.price * orderItem.count

            let item = document.createElement('div')
            item.classList.add('order-card')

            item.innerHTML = '<div id="order-item-' + index + '" class="card">\n' +
                '                <div class="img-box">\n' +
                '                  <img\n' +
                '                    src="' + orderItem.pictureUrl + '"\n' +
                '                    alt="Blue wear"\n' +
                '                    width="80px"\n' +
                '                    class="product-img"\n' +
                '                  />\n' +
                '                </div>\n' +
                '\n' +
                '                <div class="detail">\n' +
                '                  <h4 class="product-name">' + orderItem.name + ' - ' + '<span id="color-name">' + orderItem.colorOrFlavor + '</span>' +
                '                      <span class="color-visual"></span>\n' +
                '                      <span id="item-id" style="display: none;">' + orderItem.id + '</span>' +
                '                      <br>\n' +
                '                      <span id="size">' + orderItem.sizeOrQuantity + '</span>\n' +
                // '                      <span id="categories" style="display: none;">' + orderItem.categories + '</span>\n' +
                '                  </h4>\n' +
                '\n' +
                '                  <div class="wrapper">\n' +
                '                      <span id="quantity">Quantity: ' + orderItem.count + '</span>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div class="price">$ <span id="price">' + orderItem.price.toFixed(2) + '</span></div>\n' +
                '                  </div>\n' +
                '                </div>\n' +
                '              </div>'

            orderItemsContainer.append(item)
            $('.color-visual').eq(index).css('background-color', orderItem.colorCode)
        });

        let totalDiv = document.createElement('div')
        totalDiv.setAttribute('id', 'order-total')
        totalDiv.innerText = 'Total: ' + (total * 1.05).toFixed(2)
        totalDiv.classList.add('total')

        orderItemsContainer.append(totalDiv)
        container.append(orderItemsContainer)

        let continueBtn = document.createElement('div')
        continueBtn.classList.add('continue-btn')
        continueBtn.innerText = 'Continue Shopping'
        continueBtn.onclick = function () {
            window.location.href = '/index.html'
        }
        container.append(continueBtn)





    }).done(function () {
        // document.body.appendChild(document.createElement('script')).src = '/js/design/cart.js';
        // let subtotal = document.querySelector("#subtotal");
        // subtotal.textContent = itemsPrice;


    }).fail(function () {
        alert('failed')
    })
}


function formatCardNumber(cardNumberInput) {

    // Get the current value of the input field
    let cardNumber = cardNumberInput.value;

    // Remove any non-digit characters from the input
    cardNumber = cardNumber.replace(/\D/g, '');

    // Add a space after every 4 digits
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Update the value of the input field
    cardNumberInput.value = cardNumber;

}

function validateExpiryDate(input) {
    let value = input.value.trim();

    var max
    if (input.name === 'month') {
        max = 12
    } else {
        const now = new Date();
        const currentYear = now.getFullYear().toString().slice(-2);
        max = parseInt(currentYear) + 10
    }

    if (parseInt(value) > max) {
        input.value = max;
    }

    var min = 1

    if (parseInt(value) < min) {
        input.value = min;
    }
}

function validateCVV(input) {
    
    const maxLength = 4;
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}
