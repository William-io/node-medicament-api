'use strict';
//Compose drug Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // _id 9
    activePrinciple: {
        type: String,
        required: true,
        trim: true
    },
    cnpj: {
        type: String,
        required: [true, 'O CNPJ é obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    laboratory: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    registration: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    product: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    presentation: {
        type: String,
        required: true,
    },
    slug: { //dor-cabeca
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    //tags array list
    tags: [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Drug', schema);