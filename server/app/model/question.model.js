const mongoose = require('mongoose');
const schema = mongoose.Schema;

const qsnSchema = new schema({
    question : {type: String, required:true},
    options  : [],
    answer   : {type:String, required:true},
    maxtime  : {type: Number, required:true},
    score    : {type: Number, required:true}
});

mongoose.model('Question', qsnSchema);