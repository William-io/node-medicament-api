'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

//Loading routes
const indexRoute = require('./routes/index-route');
const drugRoute = require('./routes/drug-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/', indexRoute); //Executando a rota
app.use('/drugs', drugRoute);

module.exports = app; //Exporta a aplicação
