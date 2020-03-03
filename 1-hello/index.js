const express = require('express');
const bodyParser = require('body-parser');

var userRoutes = require('./routes/user.route');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.render('index', { title: 'Hello World' });
});

app.use('/users', userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}`));