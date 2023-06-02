module.exports = ( function() {
    'use strict';
    var userRoutes = require('express').Router();

    var database = require('./../database.js');
    var user_db = new database();
    
    userRoutes.get('/', function(req,res){
        if(typeof req.query.id !== "undefined" && req.query.id) {
            let sql = `select * from user where user_id = ?`;
            user_db.db.get(sql, [req.query.userId], (err, row) => {
                if(err) {
                    throw err;
                }
                let obj = {};
                obj.userId = row.user_id;
                obj.firstName = row.firstName;
                obj.lastName = row.lastName;
                obj.email = row.email;
                res.send(JSON.stringify(obj));
            });
        } else {
            let users = [];
            let sql = `select * from user`;
            user_db.db.all(sql, [], (err, rows) => {
                if(err) {
                    throw err;
                }
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
            });
        }
 
    });
    
    userRoutes.put('/', function(req,res){
        let sql = `insert into user(user_id, first_name, last_name, email) values (?, ?, ?, ?)`;

        user_db.db.run(sql, [req.query.userId, req.query.firstName, req.query.lastName, req.query.email], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
 
    });

    userRoutes.post('/', function(req,res){
        let sql = `update user set first_name=?, last_name=?, email=? where user_id= ?`;

        user_db.db.run(sql, [req.query.firstName, req.query.lastName, req.query.email, req.query.userId], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
 
    });

    userRoutes.delete('/', function(req,res){
        let sql = `delete from user where user_id = ?`;

        user_db.db.run(sql, [req.query.userId], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
 
    });

    return userRoutes;
})();
