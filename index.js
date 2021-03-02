const path = require('path')
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

const request = require('request');


//body parser
app.use(bodyParser.urlencoded({
    extended: false
}));


//api
function apiCall(finishedAPI, symbol){
    request('https://cloud.iexapis.com/stable/stock/'+symbol+'/quote?token=pk_15789549725946bd8073caab76710b2d', { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);        
		};
	});
};




app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    apiCall(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    },"tsla");
       
});
//aaa
app.post('/', function (req, res) {
    apiCall(function(doneAPI){
        quotedStock = req.body.stockname;
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stockname);
       
});

//static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('listening' + PORT));

