const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const url = require('url');

app.get('/', function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var htmlFilePath;
    if (infoFromURL.lang == "eng") {
        htmlFilePath = "../www/"
    } else if (infoFromURL.lang == "rus") {

    } else if (infoFromURL.lang == "geo") {

    }
});
app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');

/*
    fs.access(indexFilePath, fs.F_OK, (err) => {
        if (err) {
            console.error(err);
            res.send("Error to finding index file");
            return;
        }
        res.sendFile(indexFilePath);
    })
*/

// = path.join(__dirname, "../www", "index.htm");
