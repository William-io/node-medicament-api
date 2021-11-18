'use strict';
exports.post = (req, res, next) => {
    res.status(201).send(req.body);
};
