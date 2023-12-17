const itemsContainer = document.getElementById("items-container");
const currentHtml = itemsContainer.outerHTML;

$(document).ready(function () {
  getCart();
});

function getCart() {
  let email = window.sessionStorage.getItem("username");
  let itemsPrice = 0;

  // let itemPrice = cartItem.price

  // if ()

  // www.gympowers.link;
  $.get(
    "http://localhost:8080/cart/products?" + $.param({ email: email }),
    function (responseJson) {
      if (Object.keys(responseJson).length === 0) {
        $("#container").css("align-items", "center");

        itemsContainer.remove();

        document.querySelector(".order-message-container").innerHTML =
          '<span class="material-symbols-outlined">' +
          "           production_quantity_limits" +
          "        </span> \n" +
          '        <h2 id="successful-order" class="success-message">\n' +
          "          Cart is empty!\n" +
          "        </h2>";

        setTimeout(function () {
          $("#successful-order").css("height", "50px");
          $(".order-message-container").css("height", "200px");
          $(".order-message-container").css("margin-top", "100px");
          $("#successful-order").css("font-size", "35px");
          $(".order-message-container .material-symbols-outlined").css(
            "font-size",
            "70px"
          );
        }, 100);

        let continueBtn = document.createElement("div");
        continueBtn.classList.add("continue-btn");
        continueBtn.innerText = "Back to the shop";
        continueBtn.onclick = function () {
          window.location.href = "/index.html";
        };

        container.append(continueBtn);
      } else {
        itemsContainer.innerHTML = currentHtml;
        document.body.appendChild(document.createElement("script")).src =
          "/js/logic/order.js";
      }

      let cartItems = document.getElementById("cart-items");

      $.each(responseJson, function (index, cartItem) {
        let item = document.createElement("div");
        item.classList.add("product-card");

        item.innerHTML =
          '<div id="cart-item-' +
          index +
          '" class="card">\n' +
          '                <div class="img-box">\n' +
          "                  <img\n" +
          '                    src="' +
          cartItem.pictureUrl +
          '"\n' +
          '                    alt="Blue wear"\n' +
          '                    width="80px"\n' +
          '                    class="product-img"\n' +
          "                  />\n" +
          "                </div>\n" +
          "\n" +
          '                <div class="detail">\n' +
          '                  <h4 class="product-name">' +
          cartItem.name +
          " - " +
          '<span id="color-name">' +
          cartItem.color +
          "</span>" +
          '                      <span class="color-visual"></span>\n' +
          '                      <span id="item-id" style="display: none;">' +
          cartItem.id +
          "</span>" +
          "                      <br>\n" +
          '                      <span id="size">' +
          cartItem.size +
          "</span>\n" +
          // '                      <span id="categories" style="display: none;">' + cartItem.categories + '</span>\n' +
          "                  </h4>\n" +
          "\n" +
          '                  <div class="wrapper">\n' +
          '                    <div class="product-qty">\n' +
          '                      <button id="decrement">\n' +
          '                        <ion-icon name="remove-outline"></ion-icon>\n' +
          "                      </button>\n" +
          '                      <span id="quantity">' +
          cartItem.quantity +
          "</span>\n" +
          '                      <button id="increment">\n' +
          '                        <ion-icon name="add-outline"></ion-icon>\n' +
          "                      </button>\n" +
          "                    </div>\n" +
          "\n" +
          '                    <div class="price">$ <span id="price">' +
          cartItem.price.toFixed(2) +
          "</span></div>\n" +
          "                  </div>\n" +
          "                </div>\n" +
          "\n" +
          '                <button id="product-close-btn-' +
          index +
          '" class="product-close-btn">\n' +
          '                  <ion-icon name="close-outline"></ion-icon>\n' +
          "                </button>\n" +
          "              </div>";

        cartItems.append(item);
        $(".color-visual")
          .eq(index)
          .css("background-color", cartItem.colorCode);

        let removeBtn = document.getElementById("product-close-btn-" + index);
        removeBtn.onclick = function () {
          removeCartItem(cartItem.id, cartItem.color, cartItem.size);
        };

        itemsPrice += cartItem.price;
      });
    }
  )
    .done(function () {
      document.body.appendChild(document.createElement("script")).src =
        "/js/design/cart.js";
      let subtotal = document.querySelector("#subtotal");
      subtotal.textContent = itemsPrice;
    })
    .fail(function () {
      $("#container").css("align-items", "center");

      itemsContainer.remove();

      document.querySelector(".order-message-container").innerHTML =
        '<span class="material-symbols-outlined">' +
        "           production_quantity_limits" +
        "        </span> \n" +
        '        <h2 id="successful-order" class="success-message">\n' +
        "          Cart is empty!\n" +
        "        </h2>";

      setTimeout(function () {
        $("#successful-order").css("height", "50px");
        $(".order-message-container").css("height", "200px");
        $(".order-message-container").css("margin-top", "100px");
        $("#successful-order").css("font-size", "35px");
        $(".order-message-container .material-symbols-outlined").css(
          "font-size",
          "70px"
        );
      }, 100);

      let continueBtn = document.createElement("div");
      continueBtn.classList.add("continue-btn");
      continueBtn.innerText = "Back to the shop";
      continueBtn.onclick = function () {
        window.location.href = "/index.html";
      };

      container.append(continueBtn);
    });
}

function removeCartItem(id, chosenColor, chosenSize) {
  let email = window.sessionStorage.getItem("username");

  // www.gympowers.link;
  $.ajax({
    url:
      "http://localhost:8080/cart/removeProduct?" +
      $.param({ email: email }),
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ wearId: id, color: chosenColor, size: chosenSize }),
    success: function () {
      window.location.reload();
    },
  });
}
