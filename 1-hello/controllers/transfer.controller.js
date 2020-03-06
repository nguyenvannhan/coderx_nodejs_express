var db = require('../db');
var shortid = require('shortid');

module.exports.create = (req, res) => {
    res.render('transfer/create', {
        csrfToken: req.csrfToken(),
    }
    );
};

module.exports.postCreate = (req, res, next) => {
    var data = {
        id: shortid.generate(),
        accountID: req.body.accountID,
        amount: parseInt(req.body.amount),
        userId: req.signedCookies.userId,
    };

    db.get('transfers').push(data).write();

    res.redirect('/transfer/create');
};