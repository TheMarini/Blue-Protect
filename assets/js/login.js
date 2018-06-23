function displayMessageLogin(msg) {
    $('#msg-login').html('<div class="alert alert-warning">' + msg + '</div>');
}

function login(users) {

    var usermail = $("#email-input").val();
    var userpassword = $("#senha-input").val();
    var loginDone = false;
    console.log(users);

    setTimeout(function() {
        for (var i = 0; i < users.result.length; i++) {
            if (usermail == users.result[i].email && userpassword == users.result[i].senha) {
                loginDone = true;
                var indiceUser = i;
            }
        }
        if (loginDone == true) {
            sessionStorage.setItem('username', users.result[indiceUser].nome);
            sessionStorage.setItem('login', true);
            sessionStorage.setItem('type', users.result[indiceUser].type);
            location.reload();
            console.log("login feito com sucesso");
        } else {
            displayMessageLogin("Usuário e/ou senha inválido(s)");
        }
    }, 200);
}

$("#login-button").on("click", function() {
    login(getObjectStore(CONST_OS_CONTATO, 'readwrite').getAll());
});
