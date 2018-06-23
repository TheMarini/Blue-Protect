$("#grid-contatos").on("click", "tr", function (e) {
    let linhaContato = this;

    for (let i=0; i< $("td").length; i++) {
        $("td")[i].className="";
    }
    for (let i=0; i<linhaContato.children.length; i++) {
        linhaContato.children[i].className = "clickedtd";
    }
    //linhaContato.css("background-color","blue");
    $("#inputId").val(linhaContato.childNodes[0].firstChild.nodeValue);
});

function createPost(contato) {
    let store = getObjectStore(CONST_BLOG, 'readwrite');
    let req;
    req = store.add(contato);

    req.onsuccess = function (evt) {
    };

    req.onerror = function () {
    };
}

function deleteContato(id) {
    let store = getObjectStore(CONST_BLOG, 'readwrite');
    if (typeof id == "string") { id = parseInt(id); }
    let req = store.delete(id);
    req.onsuccess = function (event) {

    };
    req.onerror = function (event) {

    };
}

function updateContato(id) {
    let store = getObjectStore(CONST_BLOG, 'readwrite');
    if (typeof id == "string") { id = parseInt(id); }
    let req = store.get(id);
    req.onsuccess = function (event) {
        let record = req.result;
        if (record.condition == "disponível") {
            record.condition = "desativado";
        } else {
            record.condition = "disponível";
        }


        let reqUpdate = store.put(record);
        reqUpdate.onsuccess = function () {

        }
        reqUpdate.onerror = function (event) {

        };
    };
    req.onerror = function (event) {

    };
}

$("#btnInsert").click(function () {
    /*if (!$('#form-contato')[0].checkValidity()) {
        displayMessage("Preencha o formulário corretamente.");
        return;
    }*/
    let tituloPost = $("#titulopost").val();
    let admPost = $("#admpost").val();
    let imgPost = $("#imgpost").val();
    let textoPost = $("#textopost").val();


    let contato = { title: tituloPost, postImg: imgPost, content: textoPost, likes: "0", author: admPost, condition:"disponível"  };

    createPost(contato);
    $("#form-contato")[0].reset();
    setTimeout(exibeContatos, 200);
});

$("#btnDelete").click(function () {
    let campoId = $("#inputId").val();
    /*if (campoId == "") {
        displayMessage("Informe o ID do contato a ser excluído.");
        return;
    }*/
    deleteContato(campoId);
    setTimeout(exibeContatos, 200);
});

$("#btnUpdate").click(function () {
                let campoId = $("#inputId").val();
                /*if (campoId == "") {
                    displayMessage("Informe o ID do contato a ser alterado e a alteração desejada.");
                    return;
                }*/

                updateContato(campoId);
                setTimeout(exibeContatos, 200);
            });
