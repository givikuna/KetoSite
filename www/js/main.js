

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - VARIABLES;


var xhttp = new XMLHttpRequest();
const ketoContactGmail = "@ketoGmailINFORMATION";
const maingLang = "@lang";
var chosenAlbumID = null;
var mainArray = [];
var headerTextArray = [];
var fullArray = [];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - FUNCTIONS;


function bodyOnloadFunc() {
    var url = "http://localhost:8093/?type=mainPage";
    xhttp.open("GET", url, true);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                fullArray = [JSON.parse(this.responseText)];
                mainArray = fullArray[0][0];
                headerTextArray = fullArray[0][1];
                fillGalleries();
                fillPortfolioSection();
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
        if (maingLang == "eng" || maingLang == "Eng" || maingLang == "eNg" || maingLang == "enG" || maingLang == "ENG" || maingLang == "eNG" || maingLang == "EnG" || maingLang == "ENg" || maingLang == "English" || maingLang == "english" || maingLang == "ENGLISH") {
            galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://localhost:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=eng\">" + mainArray[i].nameEng + "</a> ";
            fillHeaderBlanks("eng");
        } else if (maingLang == "rus" || maingLang == "Rus" || maingLang == "rUs" || maingLang == "ruS" || maingLang == "RUS" || maingLang == "rUS" || maingLang == "EuS" || maingLang == "RUs" || maingLang == "Russian" || maingLang == "russian" || maingLang == "RUSSIAN") {
            galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://localhost:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=eng\">" + mainArray[i].nameRus + "</a> ";
            fillHeaderBlanks("rus");
        } else if (maingLang == "geo" || maingLang == "Geo" || maingLang == "gEo" || maingLang == "geO" || maingLang == "GEO" || maingLang == "gEO" || maingLang == "GeO" || maingLang == "GEo" || maingLang == "Georgian" || maingLang == "georgian" || maingLang == "GEORGIAN") {
            galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://localhost:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=eng\">" + mainArray[i].nameGeo + "</a> ";
            fillHeaderBlanks("geo");
        } else {
            galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://localhost:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=eng\">" + mainArray[i].nameEng + "</a> ";
            fillHeaderBlanks("eng");
        }
    }
}

function fillPortfolioSection() {
    var viewMyWorkHomePageIdDiv = document.getElementById('viewMyWorkHomePageId');
    viewMyWorkHomePageIdDiv.innerHTML = "";

    for (var i = 0; i < mainArray.length; i++) {
        var coverImg = mainArray[i].cover;
        var coverAlbumName = mainArray[i].folderName;
        viewMyWorkHomePageIdDiv.innerHTML = viewMyWorkHomePageIdDiv.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://localhost:8091/?page=album&lang=eng\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://localhost:8092/?type=albumCover&coverImg=" + coverImg + "&albumName=" + coverAlbumName + "\"></a>";
    }
}

function fillHeaderBlanks(language) {
    for (let i = 0; i < headerTextArray.length; i++) {
        var textIdVar = document.getElementById(headerTextArray[i].id);

        if (language == "eng") { textIdVar.innerHTML = headerTextArray[i].textEng; }
        else if (language == "rus") { textIdVar.innerHTML = headerTextArray[i].textRus; }
        else if (language == "geo") { textIdVar.innerHTML = headerTextArray[i].textGeo; }
        else { textIdVar.innerHTML = headerTextArray[i].textEng; }
    }
}