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
const resolveData = require('./../../library/validTest.library');
const log = console.log.bind(console);

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

    prefRouter.get('/singletest/:name/:category', (req, res) => {
        var name = req.params.name;
        var level = req.params.category;
        name = resolveData.getTestData(name.toLowerCase()) || name.toUpperCase();
        level = resolveData.getLevelData(level.toLowerCase());
        log(name, level);
        testModel.findOne({'code': name, 'levelcode': level}, {name:1, category:1, _id:1, "questions.question":1, "questions.options":1, "questions._id":1}
          , (err, result) => {
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


    prefRouter.post('/xx/submit/:testID',auth.authenticate, (req, res) => {
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
    
    prefRouter.post('/submit/answer', (req, res) => {
         const question = req.body.id;
         const answers = req.body.data;
         async.waterfall([
            getTestData,
            comapreResult
         ], (err, result) => {
             if(err){
                 var myresponse = responsegenerator.generate(true, err, 500, null);
                 res.send(myresponse);
             }else{
                 var myresponse = responsegenerator.generate(false, 'success', 500, result);
                 res.send(myresponse);
             }   
         });
         function getTestData(callback) {
            testModel.findOne({_id: question}, (err, result) => {
                if(err){
                  callback(err);
                }else{
                    console.log(result);
                   callback(null, result);
                   
                }
           });
         }

         function comapreResult(baseResult, callback) {
             console.log(baseResult);
             var allQuestions = baseResult.questions;
             var correct = 0;
             for(indx in answers){
                var id = answers[indx].questionId;
                var obj = allQuestions.find(function(obj) {return obj._id == id});
                if(obj.answer === answers[indx].optionSelected){
                   correct += 1;
                }
             }
             callback(null, correct);
         }
         
    });
    

    

    app.use('/main', prefRouter);
}