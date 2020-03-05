const shortid = require('shortid');

const db = require('../db');
var md5 = require('md5');

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value(),
        queryString: '',
    });
};

module.exports.search = (req, res) => {
    var q = req.query.q;

    var matchedUsers = db.get('users').filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }).value();

    res.render('users/index', {
        users: matchedUsers,
        queryString: q,
    });
};

module.exports.create = (req, res) => {
    console.log(req.cookies);
    res.render('users/create');
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();


    console.log(res.locals);
    db.get('users').push(req.body).write();

    res.redirect("/users");
};

module.exports.get = (req, res) => {
    let id = req.params.id;

    const user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user,
    });
};