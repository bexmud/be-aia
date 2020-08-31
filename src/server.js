require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`This app listening on port ${port}`);
});

module.exports = app;