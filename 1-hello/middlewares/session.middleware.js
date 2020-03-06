var shortid = require('shortid');
const db = require('../db');

module.exports = (req, res, next) => {
    let sessionId = req.signedCookies.sessionId;
    let cartCount = 0;

    if (!sessionId) {
        sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true,
        });

        db.get('sessions').push({
            id: sessionId
        }).write();
    } else {
        let sessionUser = db.get('sessions').find({ id: sessionId }).value();

        Object.keys(sessionUser.cart).forEach((key) => {
            cartCount += sessionUser.cart[key];
        });
    }

    res.locals.cartCount = cartCount;

    next();
}