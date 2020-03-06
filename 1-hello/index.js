require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var productRoutes = require('./routes/product.route');
var cartRoutes = require('./routes/cart.route');
var transferRoutes = require('./routes/transfer.route');

var apiProductRoute = require('./api/routes/product.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sesisonMiddleware = require('./middlewares/session.middleware');
var csurf = require('csurf')

const app = express();

const port = 3000;

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sesisonMiddleware);
app.use(csurf({ cookie: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Hello World' });
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/transfer', authMiddleware.requireAuth, transferRoutes);

app.use('/api/products', apiProductRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}`));