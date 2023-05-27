module.exports = ( function() {
    'use strict';
    var userRoutes = require('express').Router();
    
    userRoutes.get('/', function(req,res){
        res.send('test');
    });
    
    userRoutes.put('/test', function(req,res){
        res.send('test');
    });

    userRoutes.post('/test', function(req,res){
        res.send('test');
    });

    userRoutes.delete('/test', function(req,res){
        res.send('test');
    });

    return userRoutes;
})();
