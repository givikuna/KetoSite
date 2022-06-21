

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - GLOBAL VARIABLES;


var xhttp = new XMLHttpRequest();
const ketoContactGmail_Global = "@ketoGmailINFORMATION";
const maingLang_Global = "@lang";
var chosenAlbumID_Global = null;
var mainArray_Global = [];
var headerTextArray_Global = [];
var fullArray_Global = [];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - FUNCTIONS;


function bodyOnloadFunc(contactedSiteInfo) {
	var url = "http://18.188.156.189:8093/?type=mainPage";
	xhttp.open("GET", url, true);

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				fullArray_Global = [JSON.parse(this.responseText)];
				mainArray_Global = fullArray_Global[0][0];
				headerTextArray_Global = fullArray_Global[0][1];
				fillGalleries();
				if (contactedSiteInfo == 'index') {
					fillPortfolioSection();
				} else if (contactedSiteInfo == 'in_gallery') {
					fillImagesInGalleries("@infoForTheIDOfTheArrayOfTheGallery");
				} else {
					//
				}
			} else {
				alert("Server couldn\'t connect, try again later or contact us at " + ketoContactGmail_Global);
			}
		}
	};
	xhttp.send();
}

function fillImagesInGalleries(idOfTheGallerysArray) {
	var idOfTheGallerysArrayIntoInteger = parseInt(idOfTheGallerysArray);
	var folderLoc = null;
	var folderName = null;
	for (var i = 0; i < mainArray_Global.length; i++) {
		if(mainArray_Global[i].id == idOfTheGallerysArrayIntoInteger) {
			folderLoc = i;
			folderName = mainArray_Global[i].folderName;
		}
	}
	var imagesOfTheGalleryDiv = document.getElementById('imagesOfTheGallery');
	imagesOfTheGalleryDiv.innerHTML = "";

	//

	var arrayForTheListOfTheImages = mainArray_Global[folderLoc].images;

	for (var i = 0; i < arrayForTheListOfTheImages.length; i++) {
		if (i % 4 == 0) {
			imagesOfTheGalleryDiv.innerHTML = imagesOfTheGalleryDiv.innerHTML + "<div class=\"centeredDivForImages\">"
		}
		imagesOfTheGalleryDiv.innerHTML = imagesOfTheGalleryDiv.innerHTML + "<img class=\"imgForIn_Gallery\" src=\"http://18.188.156.189:8092/?type=img&albumName=" + folderName + "&requestedImage=" + arrayForTheListOfTheImages[i] + "\">";
		if (i % 4 == 0) {
			imagesOfTheGalleryDiv.innerHTML = imagesOfTheGalleryDiv.innerHTML + "</div>"
		}
	}
}

function fillGalleries() {
	var galleriesContentDiv = document.getElementById('galleriesContent');
	galleriesContentDiv.innerHTML = "";

	var maingLangToLowerCase = maingLang_Global.toLowerCase();
	for (var i = 0; i < mainArray_Global.length; i++) {
		if (maingLangToLowerCase == "rus" || maingLangToLowerCase == "russian") {
			galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_Global[i].id + "&lang=rus\">" + mainArray_Global[i].nameRus + "</a> ";
		} else if (maingLangToLowerCase == "geo" || maingLangToLowerCase == "georgian") {
			galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_Global[i].id + "&lang=geo\">" + mainArray_Global[i].nameGeo + "</a> ";
		} else {
			galleriesContentDiv.innerHTML = galleriesContentDiv.innerHTML + "<a class=\"a2\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_Global[i].id + "&lang=eng\">" + mainArray_Global[i].nameEng + "</a> ";
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

	for (var i = 0; i < mainArray_Global.length; i++) {
		var coverImg = mainArray_Global[i].cover;
		var coverAlbumName = mainArray_Global[i].folderName;
		var maingLangToLowerCase = maingLang_Global.toLowerCase();
		if (maingLangToLowerCase == "rus" || maingLangToLowerCase == "russian") {
			viewMyWorkHomePageIdDiv.innerHTML = viewMyWorkHomePageIdDiv.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_Global[i].id + "&galleryfolderName=" + mainArray_Global[i].folderName + "&lang=rus\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://18.188.156.189:8092/?type=albumCover&coverImg=" + coverImg + "\"> </a>";
		} else if (maingLangToLowerCase == "geo" || maingLangToLowerCase == "georgian") {
			viewMyWorkHomePageIdDiv.innerHTML = viewMyWorkHomePageIdDiv.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_Global[i].id + "&galleryfolderName=" + mainArray_Global[i].folderName + "&lang=geo\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://18.188.156.189:8092/?type=albumCover&coverImg=" + coverImg + "\"> </a>";
		} else {
			viewMyWorkHomePageIdDiv.innerHTML = viewMyWorkHomePageIdDiv.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_Global[i].id + "&galleryfolderName=" + mainArray_Global[i].folderName + "&lang=eng\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://18.188.156.189:8092/?type=albumCover&coverImg=" + coverImg + "\"> </a>";
		}
	}
}

function fillBlanks(language) {
	for (let i = 0; i < headerTextArray_Global.length; i++) {
	var bruh = document.getElementById(headerTextArray_Global[i].id);
		if (document.getElementById(headerTextArray_Global[i].id) !== null) {
			var textIdVar = document.getElementById(headerTextArray_Global[i].id);
			if (language == "eng") { textIdVar.innerHTML = headerTextArray_Global[i].textEng; }
			else if (language == "rus") { textIdVar.innerHTML = headerTextArray_Global[i].textRus; }
			else if (language == "geo") { textIdVar.innerHTML = headerTextArray_Global[i].textGeo; }
			else { textIdVar.innerHTML = headerTextArray_Global[i].textEng; }
		}
	}
}
