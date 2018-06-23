
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function validaEmail(email) {
    var emailValido = 1;
    if (email.indexOf("@") == -1) {emailValido = -1}
    if (email.indexOf(".com") == -1) {emailValido = -1}

    return emailValido;
}

$("#signup-button").on("click", function() {
    if (!$('#form-signup')[0].checkValidity()) {
        displayMessage("Preencha o formulário corretamente.");
        return;
    }
    var campoNome = $("#nome-input").val();
    var campoEmail = $("#email-input-signup").val();
    var campoSenha = $("#input-senha").val();
    var campoSenhaConfirm = $("#input-senha-confirm").val();

    let contato = { nome: campoNome, senha: campoSenha, email: campoEmail, type:"user"};
    if (campoSenha != campoSenhaConfirm) {
        displayMessage("As senhas não coincidem");
        return;
    }
    
    if (validaEmail(campoEmail) == -1) {
        displayMessage("Informe um e-mail válido");
        return;
    } 

    insertContato(contato);
});

