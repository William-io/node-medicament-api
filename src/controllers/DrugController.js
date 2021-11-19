'use strict';

const mongoose = require('mongoose');
const Drug = mongoose.model('Drug');

exports.post = (req, res, next) => {
    var drug = new Drug(req.body);
    //Deu tudo certo??
    drug.save().then(x => {
        res.status(201).send({ message: 'Medicamento cadastrado com sucesso!' });
        //Deu algum erro??
    }).catch(e => {
        res.status(400).send({ message: 'Erro ao cadastrar medicamento!', data: e });
    });

};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};
