'use strict';
//Acess the drug repository dataBase
const mongoose = require('mongoose');
const Drug = mongoose.model('Drug');


exports.get = async () => {
    const res = await Drug.find({
        active: true
    }, ' '); //product price slug tags
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Drug
        .findOne({
            slug: slug,
            active: true
        }, 'product price slug tags');
    return res;

}

exports.getById = async (id) => {
    const res = await Drug
        .findById(id);
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Drug
        .find({
            tags: tag,
            active: true
        }, 'product price slug tags');
    return res;

}

exports.create = async (data) => {
    var drug = new Drug(data);
    await drug.save();
}

exports.update = async (id, data) => {
    await Drug
        .findByIdAndUpdate(id, {
            $set: {
                product: data.product,
                activePrinciple: data.activePrinciple,
                price: data.price,
                slug: data.slug,
            }
        });
}

exports.delete = async (id) => {
    return Drug.findOneAndRemove(id);
}

