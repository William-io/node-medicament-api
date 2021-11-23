'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//1.1 Connection to mongodb
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//1.2 Connection to mongodb
mongoose.connect(config.connectionString);
//models
const Drug = require('./models/drug');
const Customer = require('./models/customer');
const Order = require('./models/order');
// const Laboratory = require('./models/laboratory');

//routes
const indexRoute = require('./routes/index-route');
const drugRoute = require('./routes/drug-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
//id of the drug type Guid
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/', indexRoute);
app.use('/drugs', drugRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app; 
