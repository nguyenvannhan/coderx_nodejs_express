// const db = require('../db');
var Product = require('../models/product.model');

module.exports.index = (req, res) => {
    // var page = parseInt(req.query.page) || 1;
    // var perPage = 8;

    // var start = (page - 1) * perPage;
    // var end = page * perPage;

    // let products = db.get('products').drop(start).take(perPage).value();
    // let products = db.get('products').value().splice(start, end);

    // res.render("product/index.pug", {
    //     products: products
    // });

    Product.find().then((products) => {
        res.render("product/index.pug", {
            products: products
        });
    });
}