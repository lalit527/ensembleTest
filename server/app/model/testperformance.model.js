const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const perfSchema = new Schema({
    user: {
        userId: { type: Schema.Types.ObjectId },
        useremail: { type:String }
    },
    testname: {
        testId: { type: Schema.Types.ObjectId },
        category: {type: String, required:true},
        maxscore: {type: Number, default:300, required:true},
        totalquestions: {type: Number, default:25, required:true},
        testduration: {type: Number, required:true}
    },
    timeTaken: { type: String },
    score: { type: Number },
    timeStarted: { type:Date },
    timeCompleted: { type:Date },
    statics: [{
        
        detail:{
            question : {type: String, required:true},
            options  : [{type:String, type:String}],
            correctanswer   : {type:String, required:true},
            maxtime  : {type: Number, required:true},
            score    : {type: Number, required:true},
            scoreAwarded: { type: Number },
            timeTaken: { type:Number }
        }

    }]

});

mongoose.model('Performance', perfSchema);