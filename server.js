const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const logger = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('views', path.join(__dirname + '/views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname + 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', (req, res) => {
    res.render('home');
})

app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`));