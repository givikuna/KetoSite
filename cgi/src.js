const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var fileName = infoFromURL.file
    var filExtension = fileName.split('.').pop();
    var srcLocation = "../www/" + filExtension + "/" + infoFromURL.file;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    try {
        if (fs.existsSync(srcLocation)) {
            fs.readFile(srcLocation, function (err, data) {
                res.write(data);
                return res.end();
            });
        } else {
            res.write("");
            return res.end();
        }
    } catch (error) {
        console.log(error);
    }
}).listen(8095);
console.log('Server running at http://127.0.0.1:8095/');
