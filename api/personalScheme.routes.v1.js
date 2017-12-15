var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var PersonalSchema = require('../model/PersonalScheme.model');
var neo4jSession = require('../config/neo4j.db');
const session = neo4jSession;

routes.get('/personal-scheme', function (req, res) {
    res.contentType('application/json');
    console.log("vanaf de api");
    PersonalSchema.find({})
        .then(function (PersonalSchema) {
            res.status(200).json(PersonalSchema);
        })
        .catch((error) => {
            res.status(400).json(PersonalSchema);
        });
});

routes.post('/personal-scheme', function (req, res) {
    var newitem = new PersonalSchema(req.body);
    addExerciseToScheme(newitem);
    newitem.save()
    
    .then(item => {
        res.send();
    })
    .catch((error) => {
        res.status(400).json(error);
    });
});

routes.get('/personal-scheme/:id', function (req, res) {
    console.log("hier kom ik ook");
    PersonalSchema.find({})
        .then(function (PersonalSchema) {
            res.status(200).json(PersonalSchema[req.params.id]);
        })
        .catch((error) => {
            res.status(400).json(PersonalSchema);
        });
});

routes.delete('/personal-scheme/:id', function (req, res) {
    PersonalSchema.find((err, PersonalSchema) => {  
        PersonalSchema[req.params.id].remove();
        response = {
            message: "Personal Schema successfully deleted",
            id: PersonalSchema._id
        };
        res.status(200).send(response);
    });
});

function addExerciseToScheme(PersonalSchema){
    console.log(PersonalSchema.bodyPart, PersonalSchema.name, PersonalSchema.description);

    const resultPromise = session.run(
        'CREATE(p:PersonalScheme {bodyPart: $bodyPart, name: $name, description: $description})', 
    {bodyPart: PersonalSchema.bodyPart, name: PersonalSchema.name , description: PersonalSchema.description});

    console.log(resultPromise);
    resultPromise.then(result => {
        console.log("personalSchema created in neo4j");
    }).catch(error => {
        console.log(error);
    });
}

module.exports = routes;