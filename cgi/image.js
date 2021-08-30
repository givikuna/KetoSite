const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });

    try {
        var imageLocation;
        if (infoFromURL.type == "icon") {
            imageLocation = "../www/img/icons/" + infoFromURL.img;
            if (fs.existsSync(imageLocation)) {
                fs.readFile(imageLocation, function (err, data) {
                    res.write(data);
                    return res.end();
                });
            } else {
                res.write("");
                return res.end();
            }
        } else if (infoFromURL.type == "cover") {
            imageLocation = "../www/img/onPage/cover/cover.jpg";
            if (fs.existsSync(imageLocation)) {
                fs.readFile(imageLocation, function (err, data) {
                    res.write(data);
                    return res.end();
                });
            } else {
                res.write("");
                return res.end();
            }
        } else if (infoFromURL.type == "img") {
            //
        } else if (infoFromURL.type == "onPage") {
            //
        }
    } catch (error) {
        console.log("error: " + error);
    }
}).listen(8092);
console.log('Server running at http://127.0.0.1:8092/');
