const regBtn = document.getElementById("reg-btn");

let registerError = document.getElementById("register-error");
registerError.style.display = "none";

const usernameInput = document.getElementById("reg-username");
const emailInput = document.getElementById("reg-email");
const passwordInput = document.getElementById("reg-password");

regBtn.onclick = function (event) {
	event.preventDefault();

	const usernameValue = usernameInput.value;
	const emailValue = emailInput.value;
	const passwordValue = passwordInput.value;
	// www.gympowers.link;
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/users/register",
		contentType: "application/json",
		data: JSON.stringify({
			username: usernameValue,
			email: emailValue,
			password: passwordValue,
		}),
		success: function (loginResponse) {
			if (
				loginResponse.includes("ROLE_USER") ||
				loginResponse.includes("ROLE_ADMIN") ||
				loginResponse.includes("ROLE_MODERATOR")
			) {
				window.sessionStorage.setItem("roles", loginResponse);
				window.sessionStorage.setItem("username", emailValue);
				window.location.href = "/index.html";
			} else {
				registerError.style.display = "block";
			}
		},
		error: function () {
			registerError.style.display = "block";
		},
	});
};
