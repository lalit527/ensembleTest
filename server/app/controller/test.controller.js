const mongoose = require('mongoose');
const express = require('express');
const testRouter = express.Router();
const questionModel = mongoose.model('Question');
const testModel = mongoose.model('Test');
const responsegenerator = require('./../../library/responsegenerator');
const excelreader = require('./../../library/excelreader');
const async = require('async');

module.exports.controllerFunction  = function(app) {

    testRouter.post('/add', (req, res) => {
        const optionData =  [];
        optionData.push({
            'option-A': req.body.optiona
        });
        optionData.push({
            'option-B': req.body.optionb
        });
        optionData.push({
            'option-C': req.body.optionc
        });
        optionData.push({
            'option-D': req.body.optiond
        });
        const qsn = new questionModel({
            question: req.body.qsn,
            options: optionData,
            answer: req.body.answer,
            maxtime: req.body.time,
            score: req.body.score
        });

        qsn.save((err, result) => {
           if(err){
            var myresponse = responsegenerator.generate(app, true, err, 500, null, null);
            res.send(myresponse);
           }else{
                var myresponse = responsegenerator.generate(app, false, 'success', 500, null, null);
                res.send(myresponse);
           }
        });
     });

     testRouter.post('/add/file', (req, res) => {
       
        async.waterfall([
           insertTest,
           getAllQuestions,
           saveQuestions 
        ], (err, result) => {
            console.log(err);
            console.log(result);
            if(err){
                var myresponse = responsegenerator.generate(app, true, err, 500, null, null);
                res.send(myresponse);
            }else{
                var myresponse = responsegenerator.generate(app, false, 'success', 500, null, null);
                res.send(myresponse);
            }
        });
        
        function insertTest(callback){
            const test =  new testModel({
                name: req.body.name,
                category: req.body.category,
                maxscore: req.body.score,
                testduration: req.body.time
            });
            test.save((err, result) => {
                 if(err){
                    callback(err);
                 }else{
                    callback(null, result._id);
                 }
            });
        }

        function getAllQuestions(id, callback){
            const file = "test.xlsx";
            const data = excelreader.getQsn(file);    
            callback(null, id, data);
        }

        function saveQuestions(id, data, callback){
            const allQuestion = [];
            for(let i=0; i<data.length; i++){
                console.log(data[i]);
                const optionData =  [];
                optionData.push({
                    'option-A': data[i].OptionA
                });
                optionData.push({
                    'option-B': data[i].OptionB
                });
                optionData.push({
                    'option-C': data[i].OptionC
                });
                optionData.push({
                    'option-D': data[i].OptionD
                });

                allQuestion.push({
                    question: data[i].Question,
                    options: optionData,
                    answer:  data[i].Answer
                });
            }

            testModel.findByIdAndUpdate({_id: id}, {$set: {questions: allQuestion}}, (err, result) => {
                if(err){
                    callback(err);
                }else{
                    callback(null, id);
                }
            });
            
        }
     });
    
     testRouter.put('/update/add/:qsnid', (req, res) => {
            const optionData =  [];
            optionData.push({
                'option-A': req.body.optiona
            });
            optionData.push({
                'option-B': req.body.optionb
            });
            optionData.push({
                'option-C': req.body.optionc
            });
            optionData.push({
                'option-D': req.body.optiond
            });
            const qsn = {
                question: req.body.qsn,
                options: optionData,
                answer: req.body.answer
            };
            
            console.log('reqq'+JSON.stringify(qsn));
            testModel.update({'_id': req.params.qsnid}, {$push: {questions: qsn}}    , (err, result) => {
                if(err){
                    var myresponse = responsegenerator.generate(app, true, err, 500, null, null);
                    res.send(myresponse);
                }else{
                    console.log(result);
                    var myresponse = responsegenerator.generate(app, false, 'success', 200, null, null);
                    res.send(myresponse);
                }
            });
     });

     testRouter.put('/update/remove/:testid/:qsnid', (req, res) => {
         //console.log('reqq'+JSON.stringify(qsn));
            testModel.update({'_id': req.params.testid}, {$pull: {questions: {'_id': req.params.qsnid}}}    , (err, result) => {
                if(err){
                    var myresponse = responsegenerator.generate(app, true, err, 500, null, null);
                    res.send(myresponse);
                }else{
                    console.log(result);
                    var myresponse = responsegenerator.generate(app, false, 'success', 200, null, null);
                    res.send(myresponse);
                }
            });
    });

    testRouter.put('/update/test/:testid/:qsnid', (req, res) => {
        //console.log('reqq'+JSON.stringify(qsn));
           var objForUpdate = {
              options: {}
           };
           if(req.body.optiona){
             objForUpdate.options.optiona = req.body.optiona;
           }
           if(req.body.optionb){
            objForUpdate.options.optionb = req.body.optionb;
           }
           if(req.body.optionc){
            objForUpdate.options.optionc = req.body.optionc;
           }
           if(req.body.optiond){
            objForUpdate.options.optiond = req.body.optiond;
           }
           if(req.body.question){
                objForUpdate.question = req.body.question;
            }
          if(req.body.answer){
             objForUpdate.options.answer = req.body.answer;
           }
           console.log(JSON.stringify(req.body));
           testModel.updateOne({'_id': req.params.testid, "questions._id": req.params.qsnid}, {$set: {"questions.$": objForUpdate}}, (err, result) => {
               if(err){
                   var myresponse = responsegenerator.generate(app, true, err, 500, null, null);
                   res.send(myresponse);
               }else{
                   console.log(result);
                   var myresponse = responsegenerator.generate(app, false, 'success', 200, null, null);
                   res.send(myresponse);
               }
           });
   });

     testRouter.post('/delete', (req, res) => {
         res.send("under development");
     });

     app.use('/question', testRouter);
} 