function exibeContatos() {
    $("#table-contatos").html("");
    getAllContatos(function (lista) {
        $("#table-contatos").append("<tr><td scope=\"row\">" + lista.post + "</td><td scope=\"row\">" + lista.title + "</td><td scope=\"row\">" + lista.condition +"</td></tr>");
    });
}


$("body").ready(function() {
    initDBEngine();
    openDB();
    function validateUser() {
        if (sessionStorage.getItem("type") != "admin") {
            alert("Apenas administradores têm acesso a esse conteúdo!\n Faça login em uma conta de ADM para acessá-lo.")
            window.location.replace("index.html");
        }
    }

    function getname() {
        var nameUser = sessionStorage.getItem('username');
        nameUser = nameUser.slice(0,nameUser.indexOf(" "));
        return nameUser;
    }

    validateUser();
    document.getElementById("admname").innerHTML = getname();
    document.getElementById("admpost").value = sessionStorage.getItem('username');
    setTimeout(exibeContatos, 200);


});
