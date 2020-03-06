var express = require('express');
var multer = require('multer');

var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var upload = multer({ dest: './public/uploads/' });

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate,
    controller.postCreate
);

router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 12345);
    res.send('Hello');
});

router.get('/:id', controller.get);


module.exports = router;