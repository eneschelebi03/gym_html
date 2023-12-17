function addToCart(id, chosenColor, chosenSize, quantity) {
  let email = window.sessionStorage.getItem("username");

  // www.gympowers.link
  $.ajax({
    url:
      "http://localhost:8080/cart/addProduct?" + $.param({ email: email }),
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      wearId: id,
      color: chosenColor,
      size: chosenSize,
      quantity: quantity,
    }),
    success: function () {
      cartItemAdded();
    },
    error: function () {
      authWarning();
    },
  });
}
