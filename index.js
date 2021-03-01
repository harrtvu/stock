const path = require('path')
const PORT = process.env.PORT || 5000;

const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {
        stuff: "this is stuff..."
    });
});


//static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('listening' + PORT));

