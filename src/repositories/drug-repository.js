'use strict';
//Acess the drug repository dataBase
const mongoose = require('mongoose');
const Drug = mongoose.model('Drug');

exports.get = () => {
    return Drug
        .find({
            active: true
        }, ' ') //product price slug tags
}

exports.getBySlug = (slug) => {
    return Drug
        .find({
            slug: slug,
            active: true
        }, 'product price slug tags')

}

exports.getById = (id) => {
    return Drug
        .findById(id);
}

exports.getByTag = (tag) => {
    return Drug
        .find({
            tags: tag,
            active: true
        }, 'product price slug tags')

}

exports.create = (data) => {
    var drug = new Drug(data);
    return drug.save();
}

exports.update = (id, data) => {
    return Drug
        .findByIdAndUpdate(id, {
            $set: {
                product: data.product,
                activePrinciple: data.activePrinciple,
                price: data.price,
                slug: data.slug,
            }
        });
}

exports.delete = (id) => {
    return Drug.findOneAndRemove(id);
}

