const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    var imageLocation;

    function sendImage() {
        if (fs.existsSync(imageLocation)) {
            fs.readFile(imageLocation, function (err, data) {
                res.write(data);
                return res.end();
            });
        } else {
            res.write("");
            return res.end();
        }
    }

    try {
        if (infoFromURL.type == "icon") { imageLocation = "../www/img/icons/" + infoFromURL.img; }
        else if (infoFromURL.type == "cover") { imageLocation = "../www/img/onPage/cover/cover.jpg"; }
        else if (infoFromURL.type == "albumCover") { imageLocation = "../www/img/onPage/AlbumCovers/" + infoFromURL.coverImg; }
        else if (infoFromURL.type == "img") { imageLocation = "../img/albums/" + infoFromURL.albumName + "/" + infoFromURL.requestedImage; }
        sendImage();	
    } catch (error) {
        console.log("image.js ERROR: " + error);
    }
}).listen(8092);
console.log('Server running at http://127.0.0.1:8092/');
