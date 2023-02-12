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
    getItemsCount()
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
            [input.id]: input.value,
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

function getItemsCount() {
    $('.card .detail').each(function () {
        var count = $(this).find('quantity');

        console.log($(count))
    })
}