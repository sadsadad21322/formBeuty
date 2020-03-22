const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const PORT = 8080;

// App
const app = express();
app.use('/', express.static('client/build'))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(cors());


app.listen(PORT);
console.log(`Running on ${PORT}`);