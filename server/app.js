const express = require('express');
const db = require('./config/dbconnection');
const app = express();
const userModel = require('./app/model/user.model');
const questionModel = require('./app/model/question.model');
const testModel = require('./app/model/test.model');
const userController = require('./app/controller/user.controller');
const testController = require('./app/controller/test.controller');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http').Server(app);
const cors = require('cors')

app.use(logger('dev'));
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());
app.use(cors());

app.get('/', function(req, res){
    res.send('Hello World');
});


userController.controllerFunction(app);
testController.controllerFunction(app);

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`Listening on Port ${port}`);
});