const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');

const app = express();
app.set('views', path.join(__dirname + '/views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});