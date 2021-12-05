const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    console.log("requested " + infoFromURL.type);
    var pathToArrayInfo = "../data/array_information/arraysFromCGI.json";
    var locationArrayString = fs.readFileSync(pathToArrayInfo).toString();
    var locationArray = JSON.parse(locationArrayString);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });

    try {
        var fullArray = null;
        for (let i = 0; i < locationArray.length; i++) { 
            var temporaryArrayName = locationArray[i].name;
            console.log(temporaryArrayName + " started processing");

            //

            var temporaryArrayLocation = locationArray[i].location;
            var temporaryArrayString = fs.readFileSync(temporaryArrayLocation).toString();
            console.log(temporaryArrayName + " = " + temporaryArrayString);
            if (fullArray == null) {
                fullArray = temporaryArrayString;
            } else {
                fullArray = fullArray + "," + temporaryArrayString;
            }
        }
        fullArray = "[" + fullArray + "]";
        console.log("fullArray = " + fullArray);
        res.write(fullArray.toString());
        return res.end();
    } catch (error) {
        console.log(error);
    }
}).listen(8093);
console.log('Server running at http://127.0.0.1:8093/');
