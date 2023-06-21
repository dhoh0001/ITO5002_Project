module.exports = ( function() {
    'use strict';
    var userRoutes = require('express').Router();

    var database = require('./../database.js');
    var user_db = new database();
    
    userRoutes.get('/', function(req,res){
        if(typeof req.query.userId !== "undefined" && req.query.userId) {
            if(!Number.isInteger(parseInt(req.query.userId))) {
                res.status(500).send("The user ID must be an integer");
                return;
            }
            let sql = `select * from user where user_id = ?`;
            user_db.db.get(sql, [req.query.userId], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    if(row) {
                        let obj = {};
                        obj.userId = row.user_id;
                        obj.firstName = row.first_name;
                        obj.lastName = row.last_name;
                        obj.email = row.email;
                        obj.uid = row.uid;
                        res.send(JSON.stringify(obj));
                    } else {
                        res.status(404).send("id not found");
                    }
                }
            });
        } else {
            let users = [];
            let sql = `select * from user`;
            user_db.db.all(sql, [], (err, rows) => {
                if(err) {
                    res.status(500).send("err: error retrieving from db: " + err)
                } else {
                    rows.forEach((row) => {
                        let obj = {};
                        obj.userId = row.user_id;
                        obj.firstName = row.first_name;
                        obj.lastName = row.last_name;
                        obj.email = row.email;
                        obj.uid = row.uid;
                        users.push(obj);
                    });
                    res.send(JSON.stringify(users));
                }
            });
        }
 
    });
    
    userRoutes.get('/byuid', function(req,res){
        let regex = new RegExp("[a-zA-Z0-9@.-_]");
        if(!req.query.uid.match(regex)) {
            res.status(500).send("The uid has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
            let users = [];
            let sql = `select * from user where uid = ?`;
            user_db.db.all(sql, [req.query.uid], (err, rows) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    rows.forEach((row) => {
                        let obj = {};
                        obj.userId = row.user_id;
                        obj.firstName = row.first_name;
                        obj.lastName = row.last_name;
                        obj.email = row.email;
                        obj.uid = row.uid;
                        users.push(obj);
                    });
                    res.send(JSON.stringify(users));
                }
            });
        });

    userRoutes.put('/', function(req,res){
            if(req.query.firstName.length > 100) {
                res.status(500).send("The length of the firstname is too long");
                return;
            }
        let regex = new RegExp("[a-zA-Z0-9@.-_]");
        if(!req.query.firstName.match(regex)) {
            res.status(500).send("The first name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
            if(req.query.lastName.length > 100) {
                res.status(500).send("The length of the lastname is too long");
                return;
            }
        if(!req.query.lastName.match(regex)) {
            res.status(500).send("The last name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
            if(req.query.email.length > 100) {
                res.status(500).send("The length of the email is too long");
                return;
            }
        if(!req.query.email.match(regex)) {
            res.status(500).send("The email has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
            if(req.query.uid.length > 100) {
                res.status(500).send("The length of the uid is too long");
                return;
            }
        if(!req.query.uid.match(regex)) {
            res.status(500).send("The uid has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        let sql = `insert into user(first_name, last_name, email, uid) values (?, ?, ?, ?)`;

        user_db.db.run(sql, [req.query.firstName, req.query.lastName, req.query.email, req.query.uid], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    userRoutes.post('/', function(req,res){
        if(!Number.isInteger(parseInt(req.body.userId))) {
            res.status(500).send("The user ID must be an integer");
            return;
        }
        if(req.body.firstName.length > 100) {
            res.status(500).send("The length of the firstname is too long");
            return;
        }
        let regex = new RegExp("[a-zA-Z0-9@.-_]");
        if(!req.query.firstName.match(regex)) {
            res.status(500).send("The first name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        if(req.body.lastName.length > 100) {
            res.status(500).send("The length of the lastname is too long");
            return;
        }
        if(!req.query.lastName.match(regex)) {
            res.status(500).send("The last name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        if(req.body.email.length > 100) {
            res.status(500).send("The length of the email is too long");
            return;
        }
        if(!req.query.email.match(regex)) {
            res.status(500).send("The email has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        if(req.body.uid.length > 100) {
            res.status(500).send("The length of the uid is too long");
            return;
        }
        if(!req.query.uid.match(regex)) {
            res.status(500).send("The uid has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        let sql = `update user set first_name=?, last_name=?, email=?, uid=? where user_id= ?`;

        user_db.db.run(sql, [req.body.firstName, req.body.lastName, req.body.email, req.body.uid, req.body.userId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    userRoutes.delete('/', function(req,res){
        if(!Number.isInteger(parseInt(req.query.userId))) {
            res.status(500).send("The user ID must be an integer");
            return;
        }
        let sql = `delete from user where user_id = ?`;

        user_db.db.run(sql, [req.query.userId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error deleting from db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    return userRoutes;
})();
