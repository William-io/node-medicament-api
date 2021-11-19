'use strict';

const mongoose = require('mongoose');
const Drug = mongoose.model('Drug');

exports.get = (req, res, next) => {
    Drug
        .find({})
        .then(data => {
            res.status(200).send({ data, message: 'Medicamentos listados com sucesso!' });
        }).catch(e => {
            res.status(400).send({ e, message: 'Erro ao buscar medicamentos!' });
        });
}

exports.getBySlug = (req, res, next) => {
    Drug
        .find({
            slug: req.params.slug,
            active: true
        }, 'product price slug tags')
        .then(data => {
            res.status(200).send({ data, message: 'Medicamentos listados com sucesso!' });
        }).catch(e => {
            res.status(400).send({ e, message: 'Erro ao buscar medicamentos!' });
        });
}

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
