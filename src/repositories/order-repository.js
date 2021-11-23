'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async (data) => {
    var res = await Order
        .find({}) //find({}, 'number status') = find all
        .populate('customer'); //populate('customer', 'name) = populate the customer field
    // .populate('items.product', 'title'); 
    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}