var express = require('express');
var router = express.Router();
const shortid = require('shortid');

const db = require('../db');

router.get('', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value(),
        queryString: '',
    });
});

router.get('/search', (req, res) => {
    var q = req.query.q;

    var matchedUsers = db.get('users').filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }).value();

    res.render('users/index', {
        users: matchedUsers,
        queryString: q,
    });
});

router.get('/create', (req, res) => {
    res.render('users/create');
});

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();

    db.get('users').push(req.body).write();

    res.redirect("/users");
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    const user = db.get('users').find({ id: id }).value();
    console.log(user);

    res.render('users/view', {
        user: user,
    });
});

module.exports = router;