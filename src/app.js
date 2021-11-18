'use strict';

const express = require('express');

const app = express();
const router = express.Router();   //Rota criada

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Medicament API",
        version: "0.0.1"
    });
});
app.use('/', route); //Executando a rota

module.exports = app; //Exporta a aplicação
