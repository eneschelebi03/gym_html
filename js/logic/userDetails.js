$(document).ready(function () {
  loadUserDetails();
});

function loadUserDetails() {
  let email = window.sessionStorage.getItem("username");

  // www.gympowers.link;
  $.get(
    "http://localhost:8080/users/user/details?" + $.param({ email: email }),
    function (userDetails) {
      let username = document.getElementById("username");
      let email = document.getElementById("email");
      let orders = document.getElementById("orders");
      let shipping = document.getElementById("shipping-address");

      username.innerText = userDetails.username;
      email.innerText = userDetails.email;
      orders.innerText = userDetails.orders;

      let city = userDetails.address.postCode + " " + userDetails.address.city;
      let shippnigAddress = [
        userDetails.address.country,
        city,
        userDetails.address.address,
      ].join(", ");

      shipping.innerText = shippnigAddress;
    }
  )
    .done(function () {})
    .fail(function () {
      alert("failed");
    });
}
