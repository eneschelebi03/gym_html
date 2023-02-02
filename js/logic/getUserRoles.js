$(document).ready(function () {
    getUserRoles();
});

function getUserRoles() {
    console.log('getting user')
    $.get("http://localhost:8080/users/user", function (responseJson) {

        
        let authOptions = document.getElementById('auth-options')

        $.each(responseJson, function (index, roles) {

            // if (!roles.includes('ROLE_ANONYMOUS')) {
            //     authOptions.style.display = 'none'
            // }

            console.log(roles)


        });

    }).done(function () {

    }).fail(function () {
        alert('failed')
    })
}