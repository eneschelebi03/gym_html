let loginBtn = document.getElementById("login-btn");

var userRoles = new Array;

loginBtn.onclick = function (event) {
  event.preventDefault();

  let username = document.getElementById("username-or-email").value;
  let password = document.getElementById("password").value;
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/users/auth/login",
    contentType: "application/json",
    data: JSON.stringify({ username: username, password: password }),
    success: function (loginResponse) {
      if (!loginResponse.includes("ROLE_ANONYMOUS")) {
      // if (loginResponse === "User signed-in successfully!.") {
        // Login was successful, redirect to the home page
        // getUserRoles();
        userRoles = loginResponse.slice();
        window.location.href = "/html/index.html";
      } else {
        // Login failed, do something here
      }
    },
    error: function () {
      // Handle error
    },
  });

  // $.ajax({
  //   // headers: {
  //   //     'Accept': 'application/json',
  //   //     'Content-Type': 'application/json'
  //   // },
  //   type: "POST",
  //   url: "http://localhost:8080/users/auth/login",
  //   data: JSON.stringify({ "username": username, "password" : password }),
  //   success: function () {
  //     $.get("http://127.0.0.1:5500/html/index.html");
  //   },
  //   dataType: "application/json"
  // });
  // $.post('http://example.com/form.php', { category: 'client', type: 'premium' }).done(function (response) {
  //   alert("success");
  //   $("#mypar").html(response.amount);
  // });
};
