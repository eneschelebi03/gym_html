let logoutBtn = document.getElementById("logout-btn");

logoutBtn.onclick = function () {
  logout();
};

function logout() {
  $.ajax({
		type: "POST",
		url: "http://localhost:8080/users/logout",
		contentType: "application/json",
		success: function (loginResponse) {
			window.location.href = "/index.html";
			window.sessionStorage.clear();
		},
		error: function () {
			window.location.href = "/index.html";
			window.sessionStorage.clear();
		},
	});
 
}
