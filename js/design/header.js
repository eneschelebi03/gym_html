$(document).ready(function () {
    setAuth();
    hideAdminPanel();
});

const userRoles = window.sessionStorage.getItem('roles');


function setAuth() {

    let authOptions = document.getElementById("auth-options");
    let logoutOption = document.getElementById("logout-option");
    logoutOption.style.display = 'none'

    if (userRoles !== null) {
        authOptions.style.display = "none";
        logoutOption.style.display = "flex";
    }

    console.log(userRoles);
    console.log(window.sessionStorage.getItem('username'));
}

function hideAdminPanel() {

    let adminPanel = document.getElementById("admin-panel");


    if (userRoles == null || !userRoles.includes('ROLE_ADMIN')) {
        adminPanel.remove()
    }

    console.log(userRoles);
    console.log(window.sessionStorage.getItem('username'));
}

function cartItemAdded() {
    $('#cart-notification').css('height', '50px')
    $('#cart-notification span').css('display', 'block')

    setTimeout(function () {
        $('#cart-notification').css('height', '0')
        $('#cart-notification span').css('display', 'none')
    }, 4000);
}

function showUserDetails() {


    if (userRoles != null && !userRoles.includes("ROLE_ADMIN")) {
      window.location.href = "/html/profile.html";
    } else if (userRoles.includes("ROLE_ADMIN")) {
      window.location.href = "/html/admin-dashboard.html";
    }
}
