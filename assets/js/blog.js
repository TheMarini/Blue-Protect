$("body").ready(function() {
    setTimeout(exibePosts, 200);
});

function exibeComments(commentid) {
    $("#modalcommentsbody").html("");
    getAllComments(function (comment) {
        if (comment.postId == commentid) {
            $("#modalcommentsbody").prepend("<div class=\"divcomments\"><h1 class=\"mb-2 commenttitleusername\">"+comment.author+"<span class=\"spandata\">"+comment.data+"</span></h1><p class=\"ml-3\">"+comment.comment +"</p></div>");
        }
    });
}

function exibeLikes(commentid) {
    likecontador.innerHTML = "";
    var contadorlike = 1;
    getAllLikes(function (like) {
        if (like.postId == commentid) {
            contadorlike++;
        }
    },
    function() {
        likecontador.innerHTML = " ("+contadorlike+")";
    });
}

function exibePosts() {
    $("#postsD").html("");
    var contador = 0;
    getAllPostsToBlog(function (lista,callback2) {
            $("#postsD").append("<div class=\"col-sm-8 offset-sm-2 posts-container mb-5\"><div class=\"row posts-container\" id=\"postsDS" + contador + "\"></div></div>");
            $("#postsDS"+contador).append("<div class=\"col-sm-6 img-container\"><img src=\"" + lista.postImg + "\" class=\"box-img\"></div>");
            $("#postsDS"+contador).append("<div class=\"col-sm-6 content-container\"><h1 class=\"post-blog-title\" style=\"color:blue;\">ID: " + lista.post + "</h1><h1 class=\"post-blog-title\">" + lista.title + "</h1><p>" + lista.content + "</p><div style=\"padding:15px;\"><button type=\"button\" class=\"btn btn-secondary mx-1 btn-sm\" id=\"commentbutton"+ lista.post+ "\" data-toggle=\"modal\" data-target=\"#modalcomentar\">Comentar</button><button type=\"button\" class=\"btn btn-primary btn-sm\" id =\"showcomments"+lista.post+"\" data-toggle=\"modal\" data-target=\"#commentsmodal\">Comentários</button><button class=\"mx-1\" id=\"likebutton"+lista.post+"\"><span class=\"badge badge-secondary\"><img src=\"assets/img/likeicon.svg\" class=\"like-button\">Like<span id=\"likecontador"+lista.post+"\"></span></span></button></div></div>");
            contador++;
    },
    function (lista) {
        var botao = document.getElementById("commentbutton"+lista.post);
        botao.onclick = function() {
            let commentid = this.parentElement.parentElement.firstElementChild.innerHTML;
            commentid = commentid.slice(commentid.indexOf(" ")+1,);
            document.getElementById("postnameComment").innerHTML = lista.title;
            if (sessionStorage.getItem('username') != null && sessionStorage.getItem('username') != "null") {
                document.getElementById("usernamecomment").value = sessionStorage.getItem('username');
            } else {
                document.getElementById("usernamecomment").value = "FAÇA LOGIN PARA COMENTAR";
                $("#submitcomment").attr("disabled","disabled");
                $("#submitcomment").css("cursor","inherit");
            }

            $("#submitcomment").on("click", function() {
                var username = document.getElementById("usernamecomment").value;
                var comment = document.getElementById("textcomment").value;
                var data = dataAtualFormatada();
                var author = sessionStorage.getItem('username');
                var comentario = {comment:comment, postId:commentid, data:data, author:author}
                insertComment(comentario);
            });

        }

        var botaocomments = document.getElementById("showcomments"+lista.post);
        var commentid = botaocomments.parentElement.parentElement.firstElementChild.innerHTML;
        commentid = commentid.slice(commentid.indexOf(" ")+1,);
        botaocomments.onclick = function() {

            document.getElementById("modalcommentstitle").innerHTML = lista.title;
            exibeComments(commentid);
        }

        likecontador = document.getElementById("likecontador"+lista.post);
        exibeLikes();

        var botaolike = document.getElementById("likebutton"+lista.post);
        if (sessionStorage.getItem("username") == null || sessionStorage.getItem("username") == "null") {
            botaolike.style.display="none";
        }

        botaolike.onclick = function() {
            var postId = lista.post;
            var author = sessionStorage.getItem("username");
            var like = { postId:postId, author:author };
            insertLike(like);
            exibeLikes(commentid);
        }
    });
}
