let logoutBtn = document.getElementById("logout-btn");


logoutBtn.onclick = function () {
    window.location.reload();
    window.sessionStorage.clear();

};