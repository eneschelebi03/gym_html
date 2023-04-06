let logoutBtn = document.getElementById("logout-btn");

logoutBtn.onclick = function () {
    logout()
};

function logout() {
    window.location.href = '/index.html'
    window.sessionStorage.clear();
}