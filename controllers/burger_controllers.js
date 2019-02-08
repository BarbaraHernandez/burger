var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//get all burgers
router.get('/', function(req, res){
    burger.all(function(err, data) {
        if (err) {
            throw err;
        }
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject)
    });
});

//submit a new burger
router.post('/burgers', function(req,res){
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        res.json({ id:result.insertId });
    });
});

//update an existing burger (to devoured)
router.put('/burgers/:id', function(req,res){
    var condition = "id = " + req.params.id;
    burger.update({
        devoured: req.body.devoured
    }, condition, function(res) {
        if (res.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;