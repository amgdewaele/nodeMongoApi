var express = require('express');

var routes = express.Router();

var mongodb = require('../config/mongo.db');

var Friend = require('../model/Friend.model');

var neo4jSession = require('../config/neo4j.db');
const session = neo4jSession;



routes.get('/friend', function (req, res){
    res.contentType('application/json');

    Friend.find({})
    .then(function (Friend) {
        //getFriend();
        //res.send(Friend);
        console.log(Friend);
        res.status(200).json(Friend);
    })
    .catch((error) => {
        res.status(400).json(Friend);
    });
});

routes.post('/friend/:id', function(req, res){
    const resultPromise = session.run(
        'MERGE (friend:Friend { firtname: $firstName, lastName: $lastName, age: $age })-[:HAS]->(personalScheme:PersonalScheme {name: $name, description: $description, bodyPart: $bodypart})'
    );
    resultPromise.then(result => {
        console.log("relatie gemaakt");
    }).catch(error => {
        console.log(error);
    });
});
    


routes.post('/friend', function (req, res) {
    	var newitem = new Friend(req.body);
        newitem.save()
        .then(item => {
            addFriend(item);
            res.send();
            //res.status(200).json(newitem);
        })
        .catch((error) => {
            res.status(400).json(newitem);
      });
     });	

routes.put('/friend/:id', function (req, res) {
    // var friend = new Friend(res.body);

    // friend.save()
    // .then(item => {
    //     updateFriend(friend);
    //     res.status(200).json("friend succesfull updated");
    // })
    // .catch((error) => {
    //     console.log(error);
    //     res.status(400).json("something went wrong");
    // });    
    Friend.find((err, fList) => {  
        if (err) {
            res.status(500).send(err);
        } else {
            fList = fList[req.params.id];
            fList.firstName = req.body.firstName || fList.firstName;
            fList.lastName = req.body.lastName || fList.lastName;
            fList.age = req.body.age || fList.age;
            fList.save((err, fList) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(200).send(fList);
            });
        }
    });
 });	

 routes.delete('/friend/:id', function (req, res) {
    console.log("dit is het id" + req.params.id);
    // deleteFriend(req.body);
       
    Friend.find((err, fList) => {  
        console.log(fList);
        fList[req.params.id].remove()    
        response = {
            message: "Friend succesfull deleted",
            id: fList._id
        };
        res.status(200).send(response);
    });
});


function addFriend(Friend){
    const resultPromise = session.run(
        'CREATE(f:Friend {firstName: $firstName, lastName: $lastName, age: $age})', 
    {firstName: Friend.firstName, lastName: Friend.lastName , age: Friend.age})
    resultPromise.then(result => {
        console.log("Friend created in neo4j");
    }).catch(error => {
        console.log(error);
    });
}


function deleteFriend(Friend){
    const resultPromise = session.run(
        'MATCH (n:Friend {firstName: $firstName, lastName: $lastName, age: $age}) DETACH DELETE n',
        { firstName: Friend.firstName, lastName: Friend.lastName , age: Friend.age }
    ); 
    console.log("deleting task in neo4j");
    resultPromise.then(result => {

    }).catch(error => {
        console.log(error);
    });
}

function getFriend(){
    const resultPromise = session.run(
        'MATCH (n: Friend) RETURN n');
        resultPromise.then(result => {
            console.log("friend found!");
        }).catch(error => {
            console.log(error)
        });        
}

function updateFriend(Friend){
    const resultPromise = session.run(
        'MATCH (n:Friend {firstName: $firstName, lastName: $lastName, age: $age}) RETURN n',
        {firstName: Friend.firstName, lastName: Friend.lastName , age: Friend.age});
        resultPromise.then(result => {
            console.log("friend updated")
        }).catch(error => {
            console.log(error);
        });
}

// function addFriendToScheme(Friend){

//     const resultPromise = session.run(
//         'MERGE (friend:Friend { firtname: $firstName, lastName: $lastName, age: $age })-[:HAS]->(personalScheme:PersonalScheme {name: $name, description: $description, bodyPart: $bodypart})'
//     );
//     resultPromise.then(result => {
//         console.log("relatie gemaakt");
//     }).catch(error => {
//         console.log(error);
//     });
// }
 
module.exports = routes;