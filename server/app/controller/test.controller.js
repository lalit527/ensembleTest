const mongoose = require('mongoose');
const express = require('express');
const testRouter = express.Router();
const questionModel = mongoose.model('Question');
const responsegenerator = require('./../../library/responsegenerator');

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


     testRouter.post('/delete', (req, res) => {
         res.send("under development");
     });

     app.use('/question', testRouter);
}