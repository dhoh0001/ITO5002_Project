module.exports = ( function() {
    'use strict';
    var dataRoutes = require('express').Router();
    
    dataRoutes.get('/', function(req,res){
        res.send('test');
    });

    dataRoutes.put('/test', function(req,res){
        res.send('test');
    });

    return dataRoutes;
})();
