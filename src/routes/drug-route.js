"use strict";

const express = require('express');
const router = express.Router();

//Faço a referencia ao meu controller
const controller = require('../controllers/DrugController')

router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
