const express = require('express');
const helmet  = require('helmet');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));
app.use(helmet());

module.exports = app;