//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - MODULES;


const express = require('../../../nodeModules/myExpress/node_modules/express');
const app = express();
const path = require('path');
const fs = require('fs');
const url = require('url');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - VARIABLES;


const pathToGmailInfo = "../data/contactGmail.txt";
const ketoContactGmail = fs.readFileSync(pathToGmailInfo).toString();
var errorText = null;
var htmFilePath = null;
var mainLang = null;

app.get('/', function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;


    try {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - FUNCTIONS;


        function errorTextFunc() {
            if (infoFromURL.lang == undefined || infoFromURL.lang == "eng") {
                errorText = "ERROR: the website is currently down, try again later or contact us at " + ketoContactGmail;
            } else if (infoFromURL.lang == "rus") {
                errorText = "ОШИБКА: веб-сайт в настоящее время не работает, повторите попытку позже или свяжитесь с нами по адресу " + ketoContactGmail;
            } else if (infoFromURL.lang == "geo") {
                errorText = "შეცდომა: ვებგვერდი ამჟამად გათიშულია, სცადეთ მოგვიანებით ან დაგვიკავშირდით მისამართზე " + ketoContactGmail;
            }
        }

        function assignHtmFilePath(htlmPage) {
            //
        }

        function htmFileChecker() {
            var infoFromURLPageNullChecker = null;

            // checking weter the page is a null or not
            if (!infoFromURL.page) {
                infoFromURLPageNullChecker = "n";
                //no page information was found
            } else {
                infoFromURLPageNullChecker = "y";
                //some page information was found
            }

            // gettiing the file's location
            if (infoFromURLPageNullChecker == "n") {
                htmFilePath = path.join(__dirname, "../www/main", "index.htm");
            } else {
                htmFilePath = path.join(__dirname, "../www/main", infoFromURL.page + ".htm");
            }

            // checking what language the site is to be in
            if (infoFromURL.lang == "eng" || infoFromURL.lang == "rus" || infoFromURL.lang == "geo") {
                //lang information was true
                mainLang = infoFromURL.lang;
            } else {
                //lang information was false
                mainLang = "eng";
            }

            //looking for the html file
            if (fs.existsSync(htmFilePath)) { //checking if the file exists
                //successfully located the htm file at
                fs.readFile(htmFilePath, 'utf-8', function (err, data) {
                    var dataToString = data.toString();
                    var replaced = dataToString.replace(/@lang/g, mainLang);
                    //changed the @lang
                    if (infoFromURL.page == "in_gallery") {
                        replaced = replaced.replace(/@infoForTheIDOfTheArrayOfTheGallery/g, infoFromURL.galleryID);
                        //changed the @infoForTheIDOfTheArrayOfTheGallery
                    }
                    //changement of the code is finished
                    res.write(replaced);
                    return res.end();
                });
            } else {
                wrongPageErrorHTML();
            }
        }

        // finish making error.htm & 
        function wrongPageErrorHTML() {
            //failed to locate
            if (infoFromURL.lang == "eng" || infoFromURL.lang == "rus" || infoFromURL.lang == "geo") {
                htmFilePath = path.join(__dirname, "../www/main/error", "error.htm");
            } else {
                htmFilePath = path.join(__dirname, "../www/main/error", "error.htm");
            }

            if (fs.existsSync(htmFilePath)) {
                fs.access(htmFilePath, fs.F_OK, (err) => {
                    if (err) {
                        console.error(err);
                        errorTextFunc();
                        res.send(errorText);
                        return;
                    }
                    //successfully opened error.htm
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


        if (infoFromURL.page == "about" || infoFromURL.page == "in_gallery" || infoFromURL.page == "album" || infoFromURL.page == "contact" || infoFromURL.page == "equipment" || infoFromURL.page == "index" || infoFromURL.page == "model" || infoFromURL.page == "pricing") {
            //successfully requested a page with all the required information
            htmFileChecker();
        } else if (infoFromURL.lang && !infoFromURL.page) {
            //successfully requested a page null w/ language
            htmFileChecker();
        } else if (!infoFromURL.lang) {
            //successfully requested a language nul
            htmFileChecker();
        } else if (!infoFromURL) {
            //successfully requested a complete null
            htmFileChecker();
        } else if (!infoFromURL.page) {
            //successfully requested a page null
            htmFileChecker();
        } else {
            //successfully requested an unkown
            wrongPageErrorHTML();
        }
    } catch (error) {
        console.log("index.js ERROR: " + error);
    }

});
app.listen(8091);
console.log('Server running at http://127.0.0.1:8091/');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - OTHER COMMENTS;
