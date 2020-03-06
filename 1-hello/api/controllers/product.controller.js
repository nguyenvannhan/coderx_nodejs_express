// const db = require('../db');
var Product = require('../../models/product.model');

module.exports.index = (req, res) => {
    Product.find().then((products) => {
        res.json(products);
    });
}