

/* ================== INCREMENT AND DECREMENT BUTTONS ================== */

const payAmountBtn = document.querySelector("#payAmount");
const decrementBtn = document.querySelectorAll("#decrement");
const quantityElem = document.querySelectorAll("#quantity");
const incrementBtn = document.querySelectorAll("#increment");
const priceElem = document.querySelectorAll("#price");
const subtotalElem = document.querySelector("#subtotal");
const taxElem = document.querySelector("#tax");
const totalElem = document.querySelector("#total");

totalCalc()

for (let i = 0; i < incrementBtn.length; i++) {
  incrementBtn[i].addEventListener("click", function () {
    let increment = Number(this.previousElementSibling.textContent);

    increment++;

    this.previousElementSibling.textContent = increment;

    totalCalc();
  });

  decrementBtn[i].addEventListener("click", function () {
    let decrement = Number(this.nextElementSibling.textContent);

    decrement <= 1 ? 1 : decrement--;

    this.nextElementSibling.textContent = decrement;

    totalCalc();
  });
}

/* ================== TOTAL PRICE CALCULATION ================== */


function totalCalc() {
  const tax = 0.05;
  let subtotal = 0;
  let totalTax = 0;
  let total = 0;

  for (let i = 0; i < quantityElem.length; i++) {
    subtotal +=
      Number(quantityElem[i].textContent) * Number(priceElem[i].textContent);
  }

  subtotalElem.textContent = subtotal.toFixed(2);
  totalTax = subtotal * tax;
  taxElem.textContent = totalTax.toFixed(2);
  total = subtotal + totalTax;

  totalElem.textContent = total.toFixed(2);
  payAmountBtn.textContent = total.toFixed(2);
};

/* ================== METHOD SELECT ================== */
const payMethods = document.querySelectorAll(".method");
const checkmarks = document.querySelectorAll(".checkmark");

var methodChoose = function (method) {
  payMethods.forEach((payMethod) => {
    payMethod.classList.remove("selected");


    checkmarks.forEach((checkmark) => {
      checkmark.classList.remove("fill");
      checkmark.setAttribute("name", "checkmark-circle-outline");
    });

    payMethods[method].classList.add("selected");

    checkmarks[method].classList.add("fill");
    checkmarks[method].setAttribute("name", "checkmark-circle");

  });
};

payMethods.forEach((method, i) => {
  method.addEventListener("click", () => {
    methodChoose(i);
  });
});

let checkbox = document.getElementById('chk')

checkbox.onchange = function () {
  if (document.getElementById('chk').checked) {
    $('.checkbox span').css('background-position', '0 100%')
  } else {
    $('.checkbox span').css('background-position', '100%')

  }
}

