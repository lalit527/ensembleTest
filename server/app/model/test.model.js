const mongoose = require('mongoose');
const schema = mongoose.Schema;

const testSchema = new schema({
    name: {type: String, required: true},
    category: {type: String, required:true},
    maxscore: {type: Number, default:300, required:true},
    questions: [{
        question : {type: String, required:true},
        options  : [],
        answer   : {type:String, required:true},
    }],
    testduration: {type: Number, required:true}
});

mongoose.model('Test', testSchema);