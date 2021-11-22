'use strict';

// const mongoose = require('mongoose');
// const Drug = mongoose.model('Drug');
//Import fluent-validator
const ValidationContract = require('../validators/fluent-validator')

//3. vou importa o repository
const repository = require('../repositories/drug-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send({ data, message: 'Medicamentos listados com sucesso!' });

    } catch (e) {
        res.status(500).send({ message: 'Erro ao listar medicamentos!', data: e });
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send({ data, message: 'Medicamentos listados por slug com sucesso!' });
    } catch (e) {
        res.status(500).send({ message: 'Erro ao listar medicamentos!', data: e });
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send({ data, message: 'Medicamento listado por ID com sucesso!' });

    } catch (e) {
        res.status(500).send({ message: 'Erro ao listar medicamentos!', data: e });
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send({ data, message: 'Medicamentos listados por tag com sucesso!' });
    } catch (e) {
        res.status(500).send({ message: 'Erro ao listar medicamentos!', data: e });
    }
}

exports.post = async (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.product, 3, 'Titulo do produto deve está no minimo com 3 caracteres!'); //OK! ==Dipirona
    contract.hasMinLen(req.body.registration, 13, 'N° do registro deve conter 13 caracteres!'); //OK! == 1018003900035
    contract.hasMinLen(req.body.slug, 3, 'Slug deve conter no minimo com 3 caracteres!');//OK! == dor-nas-costas

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Medicamento cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({ message: 'Erro ao cadastrar medicamento!', data: e });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.body.id, req.body)
        res.status(200).send({
            message: 'Medicamento atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({ message: 'Erro ao cadastrar medicamento!', data: e });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Medicamento removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({ message: 'Erro ao remover medicamento!', data: e });
    }
};