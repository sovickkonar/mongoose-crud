const express = require('express');


const base_routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));
app.use('/api',base_routes);


module.exports = app;