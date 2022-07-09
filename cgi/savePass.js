const express = require('../../../nodeModules/myExpress/node_modules/express');
const app = express();
const bodyParser = require('../../../nodeModules/bodyParser/node_modules/body-parser');
const path = require('path');
const fs = require('fs');
const url = require('url');

app.use(bodyParser.urlencoded({ extended: true })); 



const port = 8097;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});
