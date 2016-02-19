var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require('./connect');
var random = require('./random');

router.get('/', function(req, res){
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM zoo_animals ORDER BY id DESC;');

        query.on('row', function(row) {
            results.push(row);
        });

        console.log(results);

        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;