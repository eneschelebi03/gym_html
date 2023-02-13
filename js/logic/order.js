let saveAddressBtn = document.getElementById("save-address-btn");
let editAddressBtn = document.getElementById("edit-address-btn");
let payBtn = document.getElementById("pay-btn");
let addressForm = document.getElementById("address-form");

let details;

saveAddressBtn.onclick = function () {
    saveDetails()
}
editAddressBtn.onclick = function () {
    editDetails()
}
payBtn.onclick = function () {
    submitOrder()
}

function saveDetails() {

    $("#address-form input").removeAttr("readonly");

    $(".address-form input").css("outline", "none");
    $(".address-form .warning").css("display", "none");

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
                $(".address-form input")
                    .eq(index)
                    .css("outline", "hsl(0, 77%, 60%) 2px solid");
                $(".address-form .warning").css("display", "flex");
            }
        });

    } else {
        details = address;

        console.log(details)

        document.querySelectorAll("#address-form input")
            .forEach((input) => input.setAttribute("readonly", true));

        saveAddressBtn.style.display = "none";
        $(".address-saved").css("display", "flex");
    }
};

function editDetails() {
    $("#address-form input").removeAttr("readonly");

    saveAddressBtn.style.display = "inline-block";
    $(".address-saved").css("display", "none");
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

        items.push({ id: id, count: quantity });
    }

    let email = window.sessionStorage.getItem('username')

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/order/new?" + $.param({ email: email }),
        contentType: "application/json",
        data: JSON.stringify({ items: items, details: details }),

        success: function (response) {
            console.log(response);
            window.location.reload()
        },
        error: function (error) {
            console.error("Error sending data: " + error.message); 
        }
    });
}