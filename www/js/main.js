

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - GLOBAL VARIABLES;


var xhttp = new XMLHttpRequest();
const ketoContactGmail_G = "@ketoGmailINFORMATION";
const maingLang_G = "@lang";
var chosenAlbumID_G = null;
var mainArray_G = [];
var headerTextArray_G = [];
var fullArray_G = [];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - FUNCTIONS;


function bodyOnloadFunc(contactedSiteInfo) {
	var url = "http://18.188.156.189:8093/?type=mainPage";
	xhttp.open("GET", url, true);

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				fullArray_G = [JSON.parse(this.responseText)];
				mainArray_G = fullArray_G[0][0];
				headerTextArray_G = fullArray_G[0][1];
				fillGalleries();
				if (contactedSiteInfo == 'index') {
					fillPortfolioSection();
				} else if (contactedSiteInfo == 'in_gallery') {
					fillImagesInGalleries("@infoForTheIDOfTheArrayOfTheGallery");
				} else {
					//
				}
			} else {
				alert("Server couldn\'t connect, try again later or contact us at " + ketoContactGmail_G);
			}
		}
	};
	xhttp.send();
}

function fillImagesInGalleries(galleryID) {
	var galleryID_to_i = parseInt(galleryID);
	var folderLoc = null;
	var folderName = null;
	for (var i = 0; i < mainArray_G.length; i++) {
		if(mainArray_G[i].id == galleryID_to_i) {
			folderLoc = i;
			folderName = mainArray_G[i].folderName;
		}
	}
	var imagesOfTheGalleryDiv = document.getElementById('imagesOfTheGallery');
	imagesOfTheGalleryDiv.innerHTML = "";

	//

	var arrayForTheListOfTheImages = mainArray_G[folderLoc].images;

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
	var galleriesContent_DIV = document.getElementById('galleriesContent');
	galleriesContent_DIV.innerHTML = "";

	var maingLang_to_lCase = maingLang_G.toLowerCase();
	for (var i = 0; i < mainArray_G.length; i++) {
		if (maingLang_to_lCase == "rus" || maingLang_to_lCase == "russian") {
			galleriesContent_DIV.innerHTML = galleriesContent_DIV.innerHTML + "<a class=\"a2\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_G[i].id + "&lang=rus\">" + mainArray_G[i].nameRus + "</a> ";
		} else if (maingLang_to_lCase == "geo" || maingLang_to_lCase == "georgian") {
			galleriesContent_DIV.innerHTML = galleriesContent_DIV.innerHTML + "<a class=\"a2\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_G[i].id + "&lang=geo\">" + mainArray_G[i].nameGeo + "</a> ";
		} else {
			galleriesContent_DIV.innerHTML = galleriesContent_DIV.innerHTML + "<a class=\"a2\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_G[i].id + "&lang=eng\">" + mainArray_G[i].nameEng + "</a> ";
		}
	}
	if (maingLang_to_lCase == "rus" || maingLang_to_lCase == "russian") {
		fillBlanks("rus");
	} else if (maingLang_to_lCase == "geo" || maingLang_to_lCase == "georgian") {
		fillBlanks("geo");
	} else {
		fillBlanks("eng");
	}
}

function fillPortfolioSection() {
	var viewMyWorkHomePageId_DIV = document.getElementById('viewMyWorkHomePageId');
	viewMyWorkHomePageId_DIV.innerHTML = "";

	for (var i = 0; i < mainArray_G.length; i++) {
		var coverImg = mainArray_G[i].cover;
		var coverAlbumName = mainArray_G[i].folderName;
		var maingLang_to_lCase = maingLang_G.toLowerCase();
		if (maingLang_to_lCase == "rus" || maingLang_to_lCase == "russian") {
			viewMyWorkHomePageId_DIV.innerHTML = viewMyWorkHomePageId_DIV.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_G[i].id + "&galleryfolderName=" + mainArray_G[i].folderName + "&lang=rus\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://18.188.156.189:8092/?type=albumCover&coverImg=" + coverImg + "\"> </a>";
		} else if (maingLang_to_lCase == "geo" || maingLang_to_lCase == "georgian") {
			viewMyWorkHomePageId_DIV.innerHTML = viewMyWorkHomePageId_DIV.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_G[i].id + "&galleryfolderName=" + mainArray_G[i].folderName + "&lang=geo\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://18.188.156.189:8092/?type=albumCover&coverImg=" + coverImg + "\"> </a>";
		} else {
			viewMyWorkHomePageId_DIV.innerHTML = viewMyWorkHomePageId_DIV.innerHTML + "<a class=\"viewMyWorkA\" href=\"http://18.188.156.189:8091/?page=in_gallery&galleryID=" + mainArray_G[i].id + "&galleryfolderName=" + mainArray_G[i].folderName + "&lang=eng\"> <img class=\"viewMyWorkImg\" width=550px height=400px src=\"http://18.188.156.189:8092/?type=albumCover&coverImg=" + coverImg + "\"> </a>";
		}
	}
}

function fillBlanks(language) {
	for (let i = 0; i < headerTextArray_G.length; i++) {
		if (document.getElementById(headerTextArray_G[i].id) !== null) {
			var textIdVar = document.getElementById(headerTextArray_G[i].id);
			if (language == "eng") {
				textIdVar.innerHTML = headerTextArray_G[i].textEng;
			} else if (language == "rus") {
				textIdVar.innerHTML = headerTextArray_G[i].textRus;
			} else if (language == "geo") {
				textIdVar.innerHTML = headerTextArray_G[i].textGeo;
			} else {
				textIdVar.innerHTML = headerTextArray_G[i].textEng;
			}
		}
	}
}
