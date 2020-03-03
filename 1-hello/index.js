const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users = [
    { id: 1, name: 'Thinh' },
    { id: 2, name: 'Hung' },
];

app.get('/', (req, res) => {
    res.render('index', { title: 'Hello World' });
});

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: users,
        queryString: '',
    });
});

app.get('/users/search', (req, res) => {
    var q = req.query.q;

    var matchedUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers,
        queryString: q,
    });
});

app.get('/users/create', (req, res) => {
    res.render('users/create');
});

app.post('/users/create', (req, res) => {
    users.push(req.body);

    res.redirect("/users");
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));