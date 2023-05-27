module.exports = ( function() {
    'use strict';
    var alertRoutes = require('express').Router();
    
    alertRoutes.get('/', function(req,res){
        res.send('test');
    });
    
    alertRoutes.put('/test', function(req,res){
        res.send('test');
    });

    alertRoutes.post('/test', function(req,res){
        res.send('test');
    });

    alertRoutes.delete('/test', function(req,res){
        res.send('test');
    });

    return alertRoutes;
})();
