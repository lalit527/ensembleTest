const mongoose = require('mongoose');
const schema = mongoose.Schema;

const testSchema = new schema({
    name: {type: String, required: true},
    category: {type: String, required:true},
    maxscore: {type: number, default:300, required:true},
    totalquestions: {type: number, default:25, required:true},
    testduration: {type: number, required:true}
});

mongoose.model('Test', testSchema);