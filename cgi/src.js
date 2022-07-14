const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
	var infoFromURL = url.parse(req.url, true).query;
	const pathToGmailInfo = "../data/contactGmail.txt";
	var ketoContactGmail1 = fs.readFileSync(pathToGmailInfo).toString();
	var ketoContactGmail = ketoContactGmail1.trim('\n');
	var fileName = infoFromURL.file
	var filExtension = fileName.split('.').pop();
	var srcLocation = "../www/" + filExtension + "/" + infoFromURL.file;

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
	try {
		if (fs.existsSync(srcLocation)) {
			console.log('located ' + srcLocation);
			if (infoFromURL.file == "main.js") {
				fs.readFile(srcLocation, 'utf-8', function (err, data) {
					var dataToString = data.toString();
					var replaced1 = dataToString.replace('@lang', infoFromURL.lang);
					var replaced = replaced1.replace('@ketoGmailINFORMATION', ketoContactGmail);
					if (infoFromURL.page == "in_gallery") {
						replaced = replaced.replace(/@nameOfTheAlbumForTheGallery/g, infoFromURL.nameOfAlbum);
						replaced = replaced.replace(/@infoForTheIDOfTheArrayOfTheGallery/g, infoFromURL.albumID);
					}
					res.write(replaced);
					return res.end();
				});
			} else {
				fs.readFile(srcLocation, function (err, data) {
					res.write(data);
					return res.end();
				});
			}
		} else {
			console.log('src.js ERROR: an error was detected in src.js. The file wasn\'t found');
			res.write("");
			return res.end();
		}
	} catch (error) {
		console.log("src.js ERROR" + error);
	}
}).listen(8095);
console.log('Server running at http://127.0.0.1:8095/');

/*

if (infoFromURL.page == "in_gallery") {
replaced = dataToString.replace(/@nameOfTheAlbumForTheGallery/g, infoFromURL.galleryFolderName);
console.log("changed the @nameOfTheAlbumForTheGallery into " + infoFromURL.galleryFolderName + " as requested");
replaced = dataToString.replace(/@infoForTheIDOfTheArrayOfTheGallery/g, infoFromURL.galleryID);
console.log("changed the @infoForTheIDOfTheArrayOfTheGallery into " + infoFromURL.galleryID + " as requested");
}
console.log("after finishing the changing of the file this is the new code");

*/
