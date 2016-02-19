var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require('./connect');
var random = require('./random');

router.post('/', function(req, res){
    var animal_type = req.body.animal_type;
    var animal_amount = random(1, 100);

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO zoo_animals (animal_type, animal_amount) VALUES ($1, $2)",
            [animal_type, animal_amount],
            function (err, result) {
                done();
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    returnAnimal = {};
                    returnAnimal.animal_type = animal_type;
                    returnAnimal.animal_amount = animal_amount;
                    res.send(returnAnimal);
                }
            });
    });
});

module.exports = router;