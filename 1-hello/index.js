const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


db.defaults({ users: [] })
    .write()

app.get('/', (req, res) => {
    res.render('index', { title: 'Hello World' });
});

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value(),
        queryString: '',
    });
});

app.get('/users/search', (req, res) => {
    var q = req.query.q;

    var matchedUsers = db.get('users').filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }).value();

    res.render('users/index', {
        users: matchedUsers,
        queryString: q,
    });
});

app.get('/users/create', (req, res) => {
    res.render('users/create');
});

app.post('/users/create', (req, res) => {
    db.get('users').push(req.body).write();

    res.redirect("/users");
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));