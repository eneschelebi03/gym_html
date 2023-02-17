
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");


    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 6 + 0.45
        }s`;
      }
    });

    burger.classList.toggle("toggle");
  });
};

navSlide();

// Carousel Wear
let span = document.getElementsByClassName("wear-mover");
let product = document.getElementsByClassName("product");
let product_page = Math.ceil(product.length / 4);
let l = 0;
let movePer = 24.24;
let maxMove = 179;

let big_horizontal_tablet_view = window.matchMedia("(max-width: 1200px)");
if (big_horizontal_tablet_view.matches) {
  movePer = 43.60;
  maxMove = 200;
}

let mid_horizontal_tablet_view = window.matchMedia("(max-width: 1024px)");
if (mid_horizontal_tablet_view.matches) {
  movePer = 40.00;
  maxMove = 230;
}

let horizontal_tablet_view = window.matchMedia("(max-width: 840px)");
if (horizontal_tablet_view.matches) {
  movePer = 45.60;
  maxMove = 310;
}

let tablet_view = window.matchMedia("(max-width: 768px)");
if (tablet_view.matches) {
  movePer = 46.00;
  maxMove = 340;
}

let mobile_view = window.matchMedia("(max-width: 620px)");
if (mobile_view.matches) {
  movePer = 45.70;
  maxMove = 340;
}

let small_view = window.matchMedia("(max-width: 420px)");
if (small_view.matches) {
  movePer = 52.21;
  maxMove = 540;
}

let right_mover = () => {
  l = l + movePer;
  if (product == 1) {
    l = 0;
  }
  for (const i of product) {
    if (l > maxMove) {
      l = l - movePer;
    }
    i.style.left = "-" + l + "%";
  }
};

let left_mover = () => {
  l = l - movePer;
  if (l <= 0) {
    l = 0;
  }
  for (const i of product) {
    if (product_page > 1) i.style.left = "-" + l + "%";
  }

  console.log('moving');
};

span[1].onclick = () => {
  right_mover();
};
span[0].onclick = () => {
  left_mover();
};

let suppSpan = document.getElementsByClassName("supp-mover");
let suppProduct = document.getElementsByClassName("supp-product");

let right_suppMover = () => {
  l = l + movePer;
  if (suppProduct == 1) {
    l = 0;
  }
  for (const i of suppProduct) {
    if (l > maxMove) {
      l = l - movePer;
    }
    i.style.left = "-" + l + "%";
  }
};

let left_suppMover = () => {
  l = l - movePer;
  if (l <= 0) {
    l = 0;
  }
  for (const i of suppProduct) {
    if (product_page > 1) i.style.left = "-" + l + "%";
  }

  console.log('moving');
};

suppSpan[1].onclick = () => {
  right_suppMover();
};
suppSpan[0].onclick = () => {
  left_suppMover();
};
