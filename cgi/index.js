

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - MODULES;


const express = require('../../../nodeModules/myExpress/node_modules/express');
const app = express();
const path = require('path');
const fs = require('fs');
const url = require('url');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - VARIABLES;


const ketoContactGmail = "ketocontact@gmail.com";
var errorText = null;
var existOrNot = null;
var htmFilePath = null;
var correctPageChecker = "y";

app.get('/', function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - FUNCTIONS;


    function errorTextFunc() {
        if (infoFromURL.lang == undefined) {
            errorText = "ERROR: the website is currently down, try again later or contact us at " + ketoContactGmail;
        } else if (infoFromURL.lang == "eng") {
            errorText = "ERROR: the website is currently down, try again later or contact us at " + ketoContactGmail;
        } else if (infoFromURL.lang == "rus") {
            errorText = "ОШИБКА: веб-сайт в настоящее время не работает, повторите попытку позже или свяжитесь с нами по адресу " + ketoContactGmail;
        } else if (infoFromURL.lang == "geo") {
            errorText = "შეცდომა: ვებგვერდი ამჟამად გათიშულია, სცადეთ მოგვიანებით ან დაგვიკავშირდით მისამართზე " + ketoContactGmail;
        }
    }

    function htmFileChecker() {
        var infoFromURLPageNullChecker = null;

        if (!infoFromURL.page) {
            infoFromURLPageNullChecker = "n";
            console.log("no page information was found");
        } else {
            infoFromURLPageNullChecker = "y";
            console.log("some page information was found");
        }

        if (infoFromURLPageNullChecker == "n") {
            if (!infoFromURL.lang) {
                wrongPageErrorHTML();
                return;
            } else {
                console.log("no page information was found; some lang information was found");
                if (infoFromURL.lang == "eng" || infoFromURL.lang == "rus" || infoFromURL.lang == "geo") {
                    console.log("lang information was true");
                    console.log("opening index.htm in " + infoFromURL.lang);
                    htmFilePath = path.join(__dirname, "../www/main/" + infoFromURL.lang, "index.htm");
                } else {
                    console.log("lang information was false; no lang by the name of " + infoFromURL.lang + " currently exists");
                    wrongPageErrorHTML();
                    return;
                }
            }
        } else {
            if (infoFromURL.lang == "eng" || infoFromURL.lang == "rus" || infoFromURL.lang == "geo") {
                htmFilePath = path.join(__dirname, "../www/main/" + infoFromURL.lang, infoFromURL.page + ".htm");
            } else {
                htmFilePath = path.join(__dirname, "../www/main/eng", infoFromURL.page + ".htm");
            }
        }

        if (fs.existsSync(htmFilePath)) {
            console.log("successfully located the htm file at " + htmFilePath);
            fs.access(htmFilePath, fs.F_OK, (err) => {
                if (err) {
                    console.error(err);
                    errorTextFunc();
                    res.send(errorText);
                    return;
                }
                res.sendFile(htmFilePath);
            })
        } else {
            console.log("failed to locate " + infoFromURL.page + ".htm");
            wrongPageErrorHTML();
        }
    }

    function wrongPageErrorHTML() {
        console.log("failed to locate " + infoFromURL.page + ".htm");
        if (infoFromURL.lang == "eng" || infoFromURL.lang == "rus" || infoFromURL.lang == "geo") {
            htmFilePath = path.join(__dirname, "../www/main/error/" + infoFromURL.lang, "error.htm");
        } else {
            htmFilePath = path.join(__dirname, "../www/main/error/eng", "error.htm");
        }

        if (fs.existsSync(htmFilePath)) {
            fs.access(htmFilePath, fs.F_OK, (err) => {
                if (err) {
                    console.error(err);
                    errorTextFunc();
                    res.send(errorText);
                    return;
                }
                console.log("successfully opened error.htm");
                res.sendFile(htmFilePath);
            })
        } else {
            console.log("failed to open error.htm");
            errorTextFunc();
            console.log("successfully sent errorText");
            res.send(errorText);
            return;
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - MAIN;


    if (infoFromURL.page == "about" || infoFromURL.page == "album" || infoFromURL.page == "contact" || infoFromURL.page == "equipment" || infoFromURL.page == "index" || infoFromURL.page == "model" || infoFromURL.page == "pricing") {
        console.log("//////////////////////////////////////////////////////////////////");
        console.log("successfully requested " + infoFromURL.page + ".htm");
        htmFileChecker();
    } else if (infoFromURL.lang || !infoFromURL) {
        console.log("//////////////////////////////////////////////////////////////////");
        console.log("successfully requested a null with a language");
        htmFileChecker();
    } else if (!infoFromURL) {
        console.log("//////////////////////////////////////////////////////////////////");
        console.log("successfully requested a full null");
        htmFileChecker();
    } else if (!infoFromURL.page) {
        console.log("//////////////////////////////////////////////////////////////////");
        console.log("successfully requested a page null");
        htmFileChecker();
    } else if (infoFromURL.page == "in_gallery") {
        console.log("//////////////////////////////////////////////////////////////////");
        console.log("successfully requested in_gallery.htm");
    } else {
        console.log("//////////////////////////////////////////////////////////////////");
        correctPageChecker == "n";
        console.log("successfully requested an unkown " + infoFromURL.page + ".htm");
        wrongPageErrorHTML();
    }
});
app.listen(8091);
console.log('Server running at http://127.0.0.1:8091/');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - OTHER COMMENTS;


/*
    fs.access(htmFilePath, fs.F_OK, (err) => {
        if (err) {
            console.error(err);
            res.send("Error to finding index file");
            return;
        }
        res.sendFile(htmFilePath);
    })
*/

// = path.join(__dirname, "../www", "index.htm");

/*
    res.write("");
    return res.end();
*/