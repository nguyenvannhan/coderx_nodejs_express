const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
    if (req.signedCookies.userId) {
        var user = db.get('users').find({ id: req.signedCookies.userId }).value();

        if (!user) {
            res.redirect('/auth/login');
            return;
        }

        res.locals.user = user;

        next();
    } else {
        res.redirect('/auth/login');
        return;
    }

}