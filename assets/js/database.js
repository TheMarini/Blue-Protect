// variáveis que armazenam a conexão ao banco de dados
var db_app;
// Constantes para nomes do banco de dados e ObjectStores
const CONST_DB_APP = "blueprotect.db_app";
const CONST_OS_CONTATO = "os_contato";
const CONST_BLOG = "blog_posts";
const CONST_COMMENTS = "blog_posts_comments";
const CONST_LIKES = "blog_posts_likes"
function initDBEngine() {
    // Na linha abaixo, você deve incluir os prefixos do navegador que você vai testar.
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // Não use "let indexedDB = ..." se você não está numa function.
    // Posteriormente, você pode precisar de referências de algum objeto window.IDB*:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla nunca usou prefixo nesses objetos, então não precisamos window.mozIDB*)

    if (!window.indexedDB) {
        window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
    }
}

function openDB() {
    request = indexedDB.open(CONST_DB_APP);

    request.onerror = function (event) {
        alert("Você não habilitou minha web app para usar IndexedDB?!");
    };
    request.onsuccess = function (event) {
        db_app = request.result;
    };
    request.onupgradeneeded = function (event) {
        let storeUsers = event.currentTarget.result.createObjectStore(
            CONST_OS_CONTATO, { keyPath: 'id', autoIncrement: true });

        storeUsers.createIndex('nome', 'nome', { unique: false });
        storeUsers.createIndex('senha', 'senha', { unique: false });
        storeUsers.createIndex('email', 'email', { unique: true });
        storeUsers.createIndex('type', 'type', { unique: false });

        let blogPosts = event.currentTarget.result.createObjectStore(
            CONST_BLOG, { keyPath: 'post', autoIncrement: true });

        blogPosts.createIndex('title','title', { unique: false });
        blogPosts.createIndex('postImg', 'postImg', { unique: false });
        blogPosts.createIndex('content', 'content', { unique: false });
        blogPosts.createIndex('author', 'author', { unique: false });
        blogPosts.createIndex('condition', 'condition', { unique: false });

        let postComments = event.currentTarget.result.createObjectStore(
            CONST_COMMENTS, { keyPath: 'comentarios', autoIncrement: true });

        postComments.createIndex('comment', 'comment', { unique: false });
        postComments.createIndex('author', 'author', { unique: false });
        postComments.createIndex('postId', 'postId', { unique: false });
        postComments.createIndex('data', 'data', { unique: false });

        let postLikes = event.currentTarget.result.createObjectStore(
            CONST_LIKES, { keyPath: 'likes', autoIncrement: true });

        postLikes.createIndex('author', 'author', { unique: false });
        postLikes.createIndex('postId', 'postId', { unique: false });

        // Carrega dados ficticios
        loadDadosContatos(storeUsers);
        loadPosts(blogPosts);
        loadComments(postComments);
        loadLikes(postLikes);
    };
}

function loadDadosContatos(store) {
    // Isso é o que os dados de nossos clientes será.
    const dadosContatos = [
        { nome: "Giuliano Penido", senha: "admin", email: "giulianopenido9970@gmail.com", type: "admin"},
        { nome: "Bruno Marini", senha: "admin", email: "bruno.marini1@gmail.com", type: "admin" },
        { nome: "Arthur Teixeira", senha: "admin", email: "tutumgt@gmail.com", type: "admin" },
    ];
    let req;
    dadosContatos.forEach((element, index) => { req = store.add(element) });
    req.onsuccess = function (evt) { };
    req.onerror = function () { };
}

function loadPosts(store) {

    const dadosContatos = [
        { title: "Blue Protect é o primeiro antivírus a oferecer suporte à mineração de criptomoedas", postImg: "https://cdnbr2.img.sputniknews.com/images/983/34/9833495.jpg", content: "Em sua última atualização, o Blue Protect passou a ser compatível com softwares de mineração de criptomoedas, como o CGMines e o Bitminer. Dessa forma, os usuários poderão investir na atividade sem comprometer a sua segurança na rede.", likes: "0", author: "Giuliano Penido", condition:"disponível"},
        { title: "Blue Protect é perfeito para pequenas e médias empresas", postImg: "https://www.empreendedoresweb.com.br/wp-content/uploads/2015/10/curso-ecommerce-pequenas-empresas.jpg", content: "A assinatura do plano Premier do Antivírus Blue Protect é o ideal para empresas, sobretudo as que não disponibilizam de grandes verbas para o investimento em segurança da informação. Dessa forma, pequenas e médias empresas têm acesso a um software que promete privacidade por um preço corporativo acessível.", likes: "0", author: "Giuliano Penido", condition:"disponível"},
        { title: "Blue Protect foi considerado o melhor antivírus de 2017", postImg: "http://www.sistemasdeseguranca.pt/wp-content/uploads/2016/12/Antivirus.jpg", content: "Mesmo ao ser comparado com grandes nomes da indústria de antivírus, o Blue Protect, com seus grandes diferenciais, foi considerado pela maioria dos usuários como o melhor antivírus grátis de 2017.", likes: "0", author: "Giuliano Penido", condition:"disponível"}];
    let req;
    dadosContatos.forEach((element, index) => { req = store.add(element) });
    req.onsuccess = function (evt) { };
    req.onerror = function () { };
}

function loadComments(store) {
    // Isso é o que os dados de nossos clientes será.
    const dadosContatos = [
        { comment: "Excelente Notícia!!", postId:"1", data: "14/06/2018 22:12", author: "Giuliano Penido"},
        { comment: "Excelente Notícia!!", postId:"2", data: "14/06/2018 22:12", author: "Giuliano Penido"},
        { comment: "Excelente Notícia!!", postId:"3", data: "14/06/2018 22:12", author: "Giuliano Penido"}
    ];
    let req;
    dadosContatos.forEach((element, index) => { req = store.add(element) });
    req.onsuccess = function (evt) { };
    req.onerror = function () { };
}

function loadLikes(store) {
    // Isso é o que os dados de nossos clientes será.
    const dadosContatos = [
        {postId: "1", author: "Giuliano Penido"},
        {postId: "2", author: "Giuliano Penido"},
        {postId: "3", author: "Giuliano Penido"}
    ];
    let req;
    dadosContatos.forEach((element, index) => { req = store.add(element) });
    req.onsuccess = function (evt) { };
    req.onerror = function () { };
}

function getObjectStore(store_name, mode) {
    let tx = db_app.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

function insertContato(contato) {
    let store = getObjectStore(CONST_OS_CONTATO, 'readwrite');
    let req;
    req = store.add(contato);

     req.onsuccess = function (evt) {
        console.log("Contato inserido com sucesso.");
        document.getElementById("form-signup").reset();
        $("#signup-modal").modal("hide");
        $("#login-modal").modal("show");
    };

    req.onerror = function () {
        console.error(displayMessage("Esse e-mail já foi registrado"), this.error);
    };
}

function getAllContatos(callback) {
    let store = getObjectStore(CONST_BLOG, 'readonly');
    let req = store.openCursor();
    req.onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            req = store.get(cursor.key);
            req.onsuccess = function (event) {
                let value = event.target.result;
                callback(value);
            }
            cursor.continue();
        }
    };
};

function getAllLikes(callback, callback2) {
    let store = getObjectStore(CONST_LIKES, 'readwrite');
    let req = store.openCursor();
    req.onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {
            req = store.get(cursor.key);
            req.onsuccess = function (event) {
                let value = event.target.result;
                callback(value);
            }
            cursor.continue();
            callback2();
        }
    };
};

function getAllPostsToBlog(callback, callback2) {
    let store = getObjectStore(CONST_BLOG, 'readonly');
    let req = store.openCursor();
    req.onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            req = store.get(cursor.key);
            req.onsuccess = function (event) {
                let value = event.target.result;
                if (value.condition == "disponível") {
                    callback(value);
                    callback2(value);
                }
            }
            cursor.continue();
        }
    };
};

function getAllComments(callback) {
    let store = getObjectStore(CONST_COMMENTS, 'readonly');
    let req = store.openCursor();
    req.onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            req = store.get(cursor.key);
            req.onsuccess = function (event) {
                let value = event.target.result;
                callback(value);
            }
            cursor.continue();
        }
    };
};

function insertComment(comment) {
    let store = getObjectStore(CONST_COMMENTS, 'readwrite');
    let req;
    req = store.add(comment);

     req.onsuccess = function (evt) {
        document.getElementById("formcomment").reset();
        $("#modalcomentar").modal("hide");
    };
}

function insertLike(like) {
    let store = getObjectStore(CONST_LIKES, 'readwrite');
    let req;
    req = store.add(like);

     req.onsuccess = function (evt) {
    };
}
