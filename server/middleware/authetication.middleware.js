var mongoose = require('mongoose');
var express = require('express');
var userModel = mongoose.model('User');
var responsegenerator = require('./../library/responsegenerator');
var authenticate = function(req, res, next){
    var token = req.header('x-auth-token');
    if(!token){
        var myresponse = responsegenerator.generate(true, 'unauthenticated-request', 401, null);
        res.send(myresponse);
    }else{
        userModel.findByToken(token).then(function(user){
            console.log(user);
            if(!user){
              var myresponse = responsegenerator.generate(true, 'unauthenticated-request', 401, null);
              res.send(myresponse);
            }else{
                req.user = user;
                req.token = token;
                next();
            }
            
        }).catch((e) => {
            var myresponse = responsegenerator.generate(true, 'unexpected error', 500, e);
            res.send(myresponse);
        });
    }
    
}

module.exports = {
	authenticate: authenticate
}