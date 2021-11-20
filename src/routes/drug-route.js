"use strict";

const express = require('express');
const router = express.Router();

//Faço a referencia ao meu controller
const controller = require('../controllers/DrugController')

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
