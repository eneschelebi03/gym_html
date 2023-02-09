$(document).ready(function () {
    getUserRoles();
});

function getUserRoles() {
    let userRoles = window.sessionStorage.getItem('roles');
    let username = window.sessionStorage.getItem('username');

    let authOptions = document.getElementById("auth-options");
    let logoutOption = document.getElementById("logout-option");
    logoutOption.style.display = 'none'

    if (!userRoles.includes("ROLE_ANONYMOUS")) {
        authOptions.style.display = "none";
        logoutOption.style.display = "flex";
    }

    console.log(window.sessionStorage.getItem('roles'));
    console.log(window.sessionStorage.getItem('username'));
}
