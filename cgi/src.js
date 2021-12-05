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
                    console.log('opened ' + srcLocation);
                    res.write(replaced);
                    return res.end();
                });
            } else {
                fs.readFile(srcLocation, function (err, data) {
                    console.log('opened ' + srcLocation);
                    res.write(data);
                    return res.end();
                });
            }
        } else {
            console.log('the requested file was not found');
            console.log('sending blank');
            res.write("");
            return res.end();
        }
    } catch (error) {
        console.log(error);
    }
}).listen(8095);
console.log('Server running at http://127.0.0.1:8095/');