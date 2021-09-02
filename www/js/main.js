

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - VARIABLES;


var xhttp = new XMLHttpRequest();
const ketoContactGmail = "ketocontact@gmail.com";
const maingLang = "eng";
var mainArray = [];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - FUNCTIONS;


function bodyOnloadFunc() {
    var url = "http://localhost:8093/?lang=" + maingLang;
    xhttp.open("GET", url, true);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                mainArray = JSON.parse(this.responseText);
                fillGalleries();
            } else {
                alert("Server couldn\'t connect, try again later or contact us at " + ketoContactGmail);
            }
        }
    };
    xhttp.send();
}

function fillGalleries() {
    var galleriesContentDiv = document.getElementById('galleriesContent');
    galleriesContentDiv.innerHTML = "";

    for (var i = 0; i < mainArray.length; i++) {
        galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a id=\"a2\" href=\"\"> " + mainArray[i].name + "</a> ";
    }
}
