const mongoose = require('mongoose');
const express = require('express');
const prefRouter = express.Router();
const questionModel = mongoose.model('Question');
const testModel = mongoose.model('Test');
const performance = mongoose.model('Performance');
const responsegenerator = require('./../../library/responsegenerator');
const excelreader = require('./../../library/excelreader');
const async = require('async');

module.exports.controllerFunction  = function(app) {
    
    prefRouter.get('/all/tests', (req, res) => {
        testModel.find({}, {name:1, category:1, _id:1}, (err, result) => {
            if(err){
                var myresponse = responsegenerator.generate(app, true, err, 500, null, null);
                res.send(myresponse);
            }else{
                var myresponse = responsegenerator.generate(app, false, result, 200, null, null);
                res.send(myresponse);
            }
        });
    });

    prefRouter.get('/singletest/:testID', (req, res) => {
        testModel.find({}, {name:1, category:1, _id:1, "questions.question":1, "questions.options":1}, (err, result) => {
            if(err){
                var myresponse = responsegenerator.generate(app, true, err, 500, null, null);
                res.send(myresponse);
            }else{
                var myresponse = responsegenerator.generate(app, false, 'success', 200, result, null);
                res.send(myresponse);
            }
        });
    });
    

    app.use('/main', prefRouter);
}