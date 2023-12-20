let loginBtn = document.getElementById("login-btn");
console.log(loginBtn)

let loginError = document.getElementById("auth-error");
loginError.style.display = "none";

loginBtn.onclick = function (event) {
	event.preventDefault();

	let username = document.getElementById("username-or-email").value;
	let password = document.getElementById("password").value;

	// www.gympowers.link;
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/users/auth/login",
		contentType: "application/json",
		data: JSON.stringify({ username: username, password: password }),
		success: function (loginResponse) {
			if (!loginResponse.includes("ROLE_ANONYMOUS")) {
				window.sessionStorage.setItem("roles", loginResponse);
				window.sessionStorage.setItem("username", username);
				window.location.href = "/index.html";
			} else {
				loginError.style.display = "block";
			}
		},
		error: function () {
			loginError.style.display = "block";
		},
	});
};
