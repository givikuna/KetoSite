

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - VARIABLES;


var xhttp = new XMLHttpRequest();
const ketoContactGmail = "@ketoGmailINFORMATION";
const maingLang = "@lang";
var chosenAlbumID = null;
var mainArray = [];
var headerTextArray = [];
var fullArray = [];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - FUNCTIONS;


function bodyOnloadFunc(contactedSiteInfo) {
	var url = "http://18.188.156.189:8093/?type=mainPage";
	xhttp.open("GET", url, true);

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				fullArray = [JSON.parse(this.responseText)];
				mainArray = fullArray[0][0];
				headerTextArray = fullArray[0][1];
				fillGalleries();
				if (contactedSiteInfo == 'index') {
					fillPortfolioSection();
				} else {}
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

	var maingLangToLowerCase = maingLang.toLowerCase();
	for (var i = 0; i < mainArray.length; i++) {
		if (maingLangToLowerCase == "rus" || maingLangToLowerCase == "russian") {
			galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://18.188.156.189:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=rus\">" + mainArray[i].nameRus + "</a> ";
		} else if (maingLangToLowerCase == "geo" || maingLangToLowerCase == "georgian") {
			galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://18.188.156.189:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=geo\">" + mainArray[i].nameGeo + "</a> ";
		} else {
			galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://18.188.156.189:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=eng\">" + mainArray[i].nameEng + "</a> ";
		}
	}
	if (maingLangToLowerCase == "rus" || maingLangToLowerCase == "russian") {
		fillBlanks("rus");
	} else if (maingLangToLowerCase == "geo" || maingLangToLowerCase == "georgian") {
		fillBlanks("geo");
	} else {
		fillBlanks("eng");
	}
}

function fillPortfolioSection() {
	var viewMyWorkHomePageIdDiv = document.getElementById('viewMyWorkHomePageId');
	viewMyWorkHomePageIdDiv.innerHTML = "";

	for (var i = 0; i < mainArray.length; i++) {
		var coverImg = mainArray[i].cover;
		var coverAlbumName = mainArray[i].folderName;
		var maingLangToLowerCase = maingLang.toLowerCase();
		if (maingLangToLowerCase == "rus" || maingLangToLowerCase == "russian") {
			viewMyWorkHomePageIdDiv.innerHTML = viewMyWorkHomePageIdDiv.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://18.188.156.189:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=rus\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://18.188.156.189:8092/?type=albumCover&coverImg=" + coverImg + "&albumName=" + coverAlbumName + "\"></a>";
		} else if (maingLangToLowerCase == "geo" || maingLangToLowerCase == "georgian") {
			viewMyWorkHomePageIdDiv.innerHTML = viewMyWorkHomePageIdDiv.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://18.188.156.189:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=geo\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://18.188.156.189:8092/?type=albumCover&coverImg=" + coverImg + "&albumName=" + coverAlbumName + "\"></a>";
		} else {
			viewMyWorkHomePageIdDiv.innerHTML = viewMyWorkHomePageIdDiv.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://18.188.156.189:8091/?page=in_gallery&gallery=" + mainArray[i].id + "&lang=eng\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://18.188.156.189:8092/?type=albumCover&coverImg=" + coverImg + "&albumName=" + coverAlbumName + "\"></a>";
		}
	}
}

function fillBlanks(language) {
	for (let i = 0; i < headerTextArray.length; i++) {
	var bruh = document.getElementById(headerTextArray[i].id);
		if (document.getElementById(headerTextArray[i].id) !== null) {
			var textIdVar = document.getElementById(headerTextArray[i].id);
			if (language == "eng") { textIdVar.innerHTML = headerTextArray[i].textEng; }
			else if (language == "rus") { textIdVar.innerHTML = headerTextArray[i].textRus; }
			else if (language == "geo") { textIdVar.innerHTML = headerTextArray[i].textGeo; }
			else { textIdVar.innerHTML = headerTextArray[i].textEng; }
		}
	}
}
