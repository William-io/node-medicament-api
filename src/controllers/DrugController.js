'use strict';

const mongoose = require('mongoose');
const Drug = mongoose.model('Drug');
//Import fluent-validator
const ValidationContract = require('../validators/fluent-validator')

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
    //2. Instancio o ValidationContract onde inicializo o contrato de validação
    let contract = new ValidationContract();
    //3. Adiciono as validações, dizendo que é preciso no minimo 3 caracteres por exemplo
    contract.hasMinLen(req.body.product, 3, 'Titulo do produto deve está no minimo com 3 caracteres!'); //OK! ==Dipirona
    contract.hasMinLen(req.body.registration, 13, 'N° do registro deve conter 13 caracteres!'); //OK! == 1018003900035
    contract.hasMinLen(req.body.slug, 3, 'Slug deve conter no minimo com 3 caracteres!');//OK! == dor-nas-costas

    //4. Se os dados estiver invalido vou retornar um erro 400 bad request;
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

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