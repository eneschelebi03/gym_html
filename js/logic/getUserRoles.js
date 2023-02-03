
// import { usernameExp } from "./login";



$(document).ready(function () {
    getUserRoles();
});

function getUserRoles() {
    let userRoles = window.sessionStorage.getItem('roles');
    let username = window.sessionStorage.getItem('username');

    let authOptions = document.getElementById("auth-options");

    if (!userRoles.includes("ROLE_ANONYMOUS")) {
        authOptions.style.display = "none";
    }

    console.log(window.sessionStorage.getItem('roles'));
    console.log(window.sessionStorage.getItem('username'));

    // console.log('getting user')
    // $.get("http://localhost:8080/users/user", function (responseJson) {

    //     let authOptions = document.getElementById('auth-options')

    //     $.each(responseJson, function (index, roles) {

    //         // if (!roles.includes('ROLE_ANONYMOUS')) {
    //         //     authOptions.style.display = 'none'
    //         // }

    //         console.log(roles)

    //     });

    // }).done(function () {

    // }).fail(function () {
    //     alert('failed')
    // })
}
