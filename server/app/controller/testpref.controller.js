const mongoose = require('mongoose');
const express = require('express');
const prefRouter = express.Router();
const questionModel = mongoose.model('Question');
const testModel = mongoose.model('Test');
const performance = mongoose.model('Performance');
const responsegenerator = require('./../../library/responsegenerator');
const excelreader = require('./../../library/excelreader');
const auth = require('./../../middleware/authetication.middleware');
const async = require('async');
const multer = require('multer');
const fs = require('fs');

module.exports.controllerFunction  = function(app) {
    
    prefRouter.get('/all/tests', (req, res) => {
        testModel.find({}, {name:1, category:1, _id:1, maxscore:1,testduration:1}, (err, result) => {
            if(err){
                var myresponse = responsegenerator.generate(true, err, 500, null);
                res.send(myresponse);
            }else{
                var myresponse = responsegenerator.generate(false, 'success', 200, result);
                res.send(myresponse);
            }
        });
    });


    prefRouter.post('/upload/:id', function(req, res) {
        console.log(req.files); 
        for(indx in req.files){
            var readerStream = fs.createReadStream('./uploads/'+req.files[indx].filename);
            console.log(readerStream);
            var filePath = './uploads/'+req.files[indx].filename+req.files[indx].originalname;
            var writerStream = fs.createWriteStream(filePath);
            readerStream.pipe(writerStream);
        }
        res.send('ok');
    });

    prefRouter.get('/singletest/:testID',auth.authenticate, (req, res) => {
        testModel.find({}, {name:1, category:1, _id:1, "questions.question":1, "questions.options":1}, (err, result) => {
            if(err){
                var myresponse = responsegenerator.generate(true, err, 500, null);
                res.send(myresponse);
            }else{
                var myresponse = responsegenerator.generate(false, 'success', 200, result);
                res.send(myresponse);
            }
        });
    });

    prefRouter.get('/test/:testID', (req, res) => {
        testModel.find({_id: req.params.testID}, (err, result) => {
            if(err){
                var myresponse = responsegenerator.generate(true, err, 500, null);
                res.send(myresponse);
            }else{
                var myresponse = responsegenerator.generate(false, 'success', 200, result);
                res.send(myresponse);
            }
        });
    });


    prefRouter.post('/submit/:testID',auth.authenticate, (req, res) => {
        testModel.find({}, {name:1, category:1, _id:1, "questions.question":1, "questions.options":1}, (err, result) => {
            if(err){
                var myresponse = responsegenerator.generate(true, err, 500, null);
                res.send(myresponse);
            }else{
                var myresponse = responsegenerator.generate(false, 'success', 200, result);
                res.send(myresponse);
            }
        });
    });
    

    

    

    app.use('/main', prefRouter);
}