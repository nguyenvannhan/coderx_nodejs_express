const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

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

app.listen(port, () => console.log(`Example app listening on port ${port}`));