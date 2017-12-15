var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Exercise = require('../model/Exercise.model');

routes.get('/exercises', function (req, res) {
    res.contentType('application/json');

    Exercise.find({})
        .then(function (Exercise) {
            res.status(200).json(Exercise);
        })
        .catch((error) => {
            res.status(400).json(Exercise);
        });
});

routes.post('/exercises', function (req, res) {
    var newitem = new Exercise(req.body);
    // var joe = new Exercise({bodyPart: 'rug', name})
    // joe.save();
    newitem.save()
    .then(item => {
            res.send("item saved to database");
    })
    .catch((error) => {
        res.status(400);
    });
});

routes.put('/exercise/:id', function (req, res) {
    Exercise.find((err, exercise) => {  
        if (err) {
            res.status(500).send(err);
        } else {
            exercise = exercise[req.params.id];
            exercise.bodyPart = req.body.bodyPart || exercise.bodyPart;
            exercise.name = req.body.name || exercise.name;
            exercise.description = req.body.description || exercise.description;
            exercise.reps = req.body.reps || exercise.reps;
            exercise.sets = req.body.sets || exercise.sets

            exercise.save((err, exercise) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(200).send(exercise);
            });
        }
    });
});

routes.get('/exercises/:id', function (req, res) {
    Exercise.find({})
        .then(function (Exercise) {
            res.status(200).json(Exercise[req.params.id]);
        })
        .catch((error) => {
            res.status(400).json(Exercise);
        });
});

routes.delete('/exercise/:id', function (req, res) {
    Exercise.find((err, exercise) => {  
         exercise[req.params.id].remove();
        response = {
            message: "exercise successfully deleted",
            id: exercise._id
        };
        res.status(200).send(response);
    });
});

module.exports = routes;