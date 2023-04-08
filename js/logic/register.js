let regBtn = document.getElementById("reg-btn");


regBtn.onclick = function (event) {
    event.preventDefault();

    let username = document.getElementById("reg-username").value;
    let email = document.getElementById("reg-email").value;
    let password = document.getElementById("reg-password").value;
    
    $.ajax({
      type: "POST",
      url: "https://www.gympowers.link/users/register",
      contentType: "application/json",
      data: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      success: function (loginResponse) {
        if (!loginResponse.includes("ROLE_ANONYMOUS")) {
          window.sessionStorage.setItem("roles", loginResponse);
          window.sessionStorage.setItem("username", email);
          window.location.href = "/index.html";
        } else {
          // Login failed, do something here
        }
      },
      error: function () {
        // Handle error
      },
    });
}