module.exports = ( function() {
    'use strict';
    var uiMetadataRoutes = require('express').Router();
    
    uiMetadataRoutes.get('/', function(req,res){
        res.send('test');
    });
    
    uiMetadataRoutes.put('/test', function(req,res){
        res.send('test');
    });

    uiMetadataRoutes.post('/test', function(req,res){
        res.send('test');
    });

    uiMetadataRoutes.delete('/test', function(req,res){
        res.send('test');
    });

    return uiMetadataRoutes;
})();
