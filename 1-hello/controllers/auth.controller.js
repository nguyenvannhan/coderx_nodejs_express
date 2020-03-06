const db = require('../db');
var md5 = require('md5');

module.exports.login = (req, res) => {
    res.render('auth/login', {
        csrfToken: req.csrfToken(),
    });
}

module.exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = db.get('users').find({ email: email }).value();

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exitst',
            ],
            values: req.body,
            csrfToken: req.csrfToken(),
        });
        return;
    }

    let hashedPassword = md5(password);

    if (user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong Password',
            ],
            values: req.body,
            csrfToken: req.csrfToken(),
        });
        return;
    }

    res.cookie('userId', user.id, {
        signed: true,
    });
    res.redirect('/users');
};

