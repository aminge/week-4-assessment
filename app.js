var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var submitanimal = require('./routes/submitanimal');
var getanimals = require('./routes/getanimals');
var pg = require('pg');

//var connectionString = '';
//
//if(process.env.DATABASE_URL != undefined) {
//    connectionString = process.env.DATABASE_URL + 'ssl';
//} else {
//    connectionString = 'postgres://localhost:5432/week_4_assessment';
//}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);


app.use('/submitanimal', submitanimal);
app.use('/getanimals', getanimals)

app.get('/*', function(req, res) {
    console.log("Here is the request: " , req.params);
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public/', file));
});

app.listen(app.get('port'), function() {
    console.log('Server is ready on port ' + app.get('port'));
});