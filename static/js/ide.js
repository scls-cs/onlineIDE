let editor;

window.onload = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    //editor.session.setMode("ace/mode/c_cpp");
}

function changeLanguage() {

    let language = $("#languages").val();

    if(language == 'c' || language == 'cpp')editor.session.setMode("ace/mode/c_cpp");
    else if(language == 'php')editor.session.setMode("ace/mode/php");
    else if(language == 'python')editor.session.setMode("ace/mode/python");
    else if(language == 'node')editor.session.setMode("ace/mode/javascript");
}

function executeCode() {
    $.ajax({
        url: "/ide/app/compiler.php",
        method: "POST",
        data: editor.getSession().getValue(),
        success: function(response) {
            $(".output").text(response)
        }
    })
}

const btn = document.querySelector('.btn');

btn.addEventListener('click', function () {
    fetch('/executeCode', {
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'POST',
        body : JSON.stringify({
            'language': $("#languages").val(),
            'code': editor.getSession().getValue()
        }, null, '\t')
    })
    .then(function (response){

        if(response.ok) {
            response.json()
            .then(function(response) {
                console.log(response);
            });
        }
        else {
            throw Error('Something went wrong');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
});