module.exports = ( function() {
    'use strict';
    var userRoutes = require('express').Router();

    var database = require('./../database.js');
    var user_db = new database();
    
    userRoutes.get('/', function(req,res){
        if(typeof req.query.id !== "undefined" && req.query.id) {
            if(!Number.isInteger(req.query.userId)) {
                res.status(500).send("The user ID must be an integer");
            }
            let sql = `select * from user where user_id = ?`;
            user_db.db.get(sql, [req.query.userId], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    let obj = {};
                    obj.userId = row.user_id;
                    obj.firstName = row.firstName;
                    obj.lastName = row.lastName;
                    obj.email = row.email;
                    res.send(JSON.stringify(obj));
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
                        console.log(row.name)
                        let obj = {};
                        obj.userId = row.user_id;
                        obj.firstName = row.firstName;
                        obj.lastName = row.lastName;
                        obj.email = row.email;
                        users.push(obj);
                    });
                    res.send(JSON.stringify(users));
                }
            });
        }
 
    });
    
    userRoutes.put('/', function(req,res){
            if(req.query.firstName.length > 100) {
                res.status(500).send("The length of the firstname is too long");
            }
            if(req.query.lastName.length > 100) {
                res.status(500).send("The length of the lastname is too long");
            }
            if(req.query.email.length > 100) {
                res.status(500).send("The length of the email is too long");
            }
        let sql = `insert into user(user_id, first_name, last_name, email) values (?, ?, ?, ?)`;

        user_db.db.run(sql, [req.query.userId, req.query.firstName, req.query.lastName, req.query.email], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    userRoutes.post('/', function(req,res){
        if(!Number.isInteger(req.query.userId)) {
            res.status(500).send("The user ID must be an integer");
        }
        if(req.query.firstName.length > 100) {
            res.status(500).send("The length of the firstname is too long");
        }
        if(req.query.lastName.length > 100) {
            res.status(500).send("The length of the lastname is too long");
        }
        if(req.query.email.length > 100) {
            res.status(500).send("The length of the email is too long");
        }
        let sql = `update user set first_name=?, last_name=?, email=? where user_id= ?`;

        user_db.db.run(sql, [req.query.firstName, req.query.lastName, req.query.email, req.query.userId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    userRoutes.delete('/', function(req,res){
        if(!Number.isInteger(req.query.userId)) {
            res.status(500).send("The user ID must be an integer");
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
