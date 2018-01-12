const mongoose = require('mongoose');
const schema = mongoose.Schema;

const perfSchema = new schema({
    user: {
        userId: { type: Schema.Types.ObjectId },
        useremail: { type:String }, ref: 'User'
    },
    testname: {
        testId: { type: Schema.Types.ObjectId },
        category: {type: String, required:true},
        maxscore: {type: number, default:300, required:true},
        totalquestions: {type: number, default:25, required:true},
        testduration: {type: number, required:true}
        , ref: 'Test'
    },
    timeTaken: { type: String },
    score: { type: Number },
    timeStarted: { type:Date },
    timeCompleted: { type:Date },
    statics: {
        
        detail:{
            question : {type: String, required:true},
            options  : [{type:String, type:String}],
            correctanswer   : {type:String, required:true},
            maxtime  : {type: number, required:true},
            score    : {type: number, required:true},
            scoreAwarded: { type: number },
            timeTaken: { type:number }
        }

    }

});

mongoose.model('Performance', perfSchema);