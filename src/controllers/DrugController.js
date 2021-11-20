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
            res.status(200).send(
                { data, message: 'Medicamentos listados por SLUG com sucesso!' });
        }).catch(e => {
            res.status(400).send(
                { e, message: 'Erro ao buscar medicamentos!' });
        });
}

exports.getById = (req, res, next) => {
    Drug
        .findById(req.params.id)
        .then(data => {
            res.status(200).send({ data, message: 'Medicamentos listados por ID com sucesso!' });
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req, res, next) => {
    Drug
        .find({
            tags: req.params.tag,
            active: true
        }, 'product price slug tags')
        .then(data => {
            res.status(200).send({ data, message: 'Medicamentos listados por TAGS com sucesso!' });
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req, res, next) => {
    var drug = new Drug(req.body);
    drug.save().then(x => {
        res.status(201).send({ message: 'Medicamento cadastrado com sucesso!' });

    }).catch(e => {
        res.status(400).send({ message: 'Erro ao cadastrar medicamento!', data: e });
    });
};

exports.put = (req, res, next) => {
    Drug
        .findByIdAndUpdate(req.params.id, {
            $set: {
                product: req.body.product,
                activePrinciple: req.body.activePrinciple,
                price: req.body.price,
            }
        }).then(x => {
            res.status(200).send({
                message: 'Medicamento atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao atualizar medicamento!',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    Drug
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Medicamento removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao remover medicamento!',
                data: e
            });
        });
};