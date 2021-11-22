'use strict';

const mongoose = require('mongoose');
const Drug = mongoose.model('Drug');
//Import fluent-validator
const ValidationContract = require('../validators/fluent-validator')

//3. vou importa o repository
const repository = require('../repositories/drug-repository');

exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(200).send({ data, message: 'Medicamentos listados com sucesso!' });
        }).catch(e => {
            res.status(400).send({ e, message: 'Erro ao buscar medicamentos!' });
        });
}

exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(
                { data, message: 'Medicamentos listados por SLUG com sucesso!' });
        }).catch(e => {
            res.status(400).send(
                { e, message: 'Erro ao buscar medicamentos!' });
        });
}

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send({ data, message: 'Medicamentos listados por ID com sucesso!' });
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
        .then(data => {
            res.status(200).send({ data, message: 'Medicamentos listados por TAGS com sucesso!' });
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.product, 3, 'Titulo do produto deve está no minimo com 3 caracteres!'); //OK! ==Dipirona
    contract.hasMinLen(req.body.registration, 13, 'N° do registro deve conter 13 caracteres!'); //OK! == 1018003900035
    contract.hasMinLen(req.body.slug, 3, 'Slug deve conter no minimo com 3 caracteres!');//OK! == dor-nas-costas


    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({ message: 'Medicamento cadastrado com sucesso!' });

        }).catch(e => {
            res.status(400).send({ message: 'Erro ao cadastrar medicamento!', data: e });
        });
};

exports.put = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        .then(x => {
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
    repository.delete(req.body.id)
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