const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");


sign_up_btn.addEventListener("click", () => {
  registerMode()
});

sign_in_btn.addEventListener("click", () => {
  loginMode()
});

function registerMode() { 
  container.classList.add("sign-up-mode");
};


function loginMode() {
  container.classList.remove("sign-up-mode");

  console.log('login-mode')
};