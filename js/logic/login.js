let loginBtn = document.getElementById("login-btn");


loginBtn.onclick = function (event) {
  event.preventDefault();

  let username = document.getElementById("username-or-email").value;
  let password = document.getElementById("password").value;
  $.ajax({
    type: "POST",
    url: "https://www.gympowers.link/users/auth/login",
    contentType: "application/json",
    data: JSON.stringify({ username: username, password: password }),
    success: function (loginResponse) {
      if (!loginResponse.includes("ROLE_ANONYMOUS")) {

        window.sessionStorage.setItem('roles', loginResponse);
        window.sessionStorage.setItem('username', username);
        window.location.href = "/index.html";
        
      } else {
        // Login failed, do something here
      }
    },
    error: function () {
      // Handle error
    },
  });
};

