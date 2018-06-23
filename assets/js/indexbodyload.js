$("body").ready(function() {
    initDBEngine();
    openDB();

    if (sessionStorage.getItem('login') != "null" && sessionStorage.getItem('login') != null) {

        function changeButton() {
            var username = sessionStorage.getItem('username');
            document.getElementById("entrar").innerHTML = "Sair";
            document.getElementById("profile").innerHTML = username;
            $("#entrar").on("click", function() {
                sessionStorage.setItem('username', null);
                sessionStorage.setItem('login', null);
                sessionStorage.setItem('type', null);
                location.reload();
            });
        }

        function changeProfile() {
            $("#profile").addClass("dropdown-toggle");
            if (sessionStorage.getItem('type') == "admin") {
                $("#dropdown-item").html("<a class=\"dropdown-item\" href=\"#\">Perfil</a><a class=\"dropdown-item\" href=\"#\">Meu Plano Blue Protect</a><a class=\"dropdown-item\" href=\"#\">Proteja a sua Empresa</a><div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"admpage.html\">Página de Administrador</a>");
            } else {
                $("#dropdown-item").html("<a class=\"dropdown-item\" href=\"#\">Perfil</a><a class=\"dropdown-item\" href=\"#\">Meu Plano Blue Protect</a><a class=\"dropdown-item\" href=\"#\">Proteja a sua Empresa</a>");
            }
        }
        changeButton();
        changeProfile();

    } else {
        $("#profile").attr("data-toggle", "popover");
        $("#profile").attr("data-content","Faça Login para acessar o Perfil!");
        $("#profile").attr("title","Você ainda não fez Login");
        $("#profile").attr("data-placement","bottom");
        $("#profile").attr("data-trigger","focus");

        $("#profile").on("click", function() {
            $('[data-toggle="popover"]').popover();
        });
    }
});

function blogredirect() {
    window.location.href = "blog.html";
}
