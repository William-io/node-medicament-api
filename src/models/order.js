'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: { //1. Vou referenciar o customer utilizando ref: para utilizar uma coleção
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now //2. Passo date.now onde todo pedido criado vai ser gerada uma data de criação
    },
    status: { //3. Passo o status do pedido
        type: String,
        required: true,
        enum: ['created', 'paid', 'shipped', 'canceled', 'done'], //4. Criado, pago, enviado, cancelado, concluido
        default: 'created'
    },
    items: [{ //5. Passo o array de items e faço referencia ao customer
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
            default: 1
        },
        drugs: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Drugs'
        }
    }],
});

module.exports = mongoose.model('Order', schema);