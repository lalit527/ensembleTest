const express = require('express');
const db = require('./library/dbconnection');
const app = express();
const userModel = require('./app/model/user.model');
const questionModel = require('./app/model/question.model');
const testModel = require('./app/model/test.model');
const perfModel = require('./app/model/testperformance.model');
const userController = require('./app/controller/user.controller');
const testController = require('./app/controller/test.controller');
const perfController = require('./app/controller/testpref.controller');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http').Server(app);
const cors = require('cors')

app.use(logger('dev'));
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
  };
app.use(cors(corsOption));

app.get('/', function(req, res){
    res.send('Hello World');
});


userController.controllerFunction(app);
testController.controllerFunction(app);
perfController.controllerFunction(app);

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`Listening on Port ${port}`);
});