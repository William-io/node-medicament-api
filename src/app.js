'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//1.1 Connection to mongodb
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//1.2 Connection to mongodb
mongoose.connect('mongodb+srv://william-io:root@ndstr.bgmwl.mongodb.net/ndstr?retryWrites=true&w=majority');
//models
const Drug = require('./models/drug');
const Customer = require('./models/customer');
const Order = require('./models/order');
// const Laboratory = require('./models/laboratory');

//routes
const indexRoute = require('./routes/index-route');
const drugRoute = require('./routes/drug-route');
const customerRoute = require('./routes/customer-route');

app.use(bodyParser.json());
//id of the drug type Guid
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/', indexRoute);
app.use('/drugs', drugRoute);
app.use('/customers', customerRoute);

module.exports = app; 
