const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwtKey = require('./../../config/config');

const userschema = new schema({
    name: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    role: { type: String, enum: ['admin', 'user'] },
    gender: { type:String, enum:['male', 'female', 'others'] },
    gravatar: { type:String },
    facebook: { type:String },
    google: { type:String },
    token: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

userschema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, jwtKey.getjwtKey()).toString();
    user.token.push({
        access: access,
        token: token
    });

    return user.save().then((success) => token);
}

userschema.statics.findByCredential = function(email, password){
    var user = this;
    return user.findOne({email}).then(function(result){
        if(!result){
           return Promise.reject();
        }
        return new Promise((resolve, reject) => {
             bcrypt.compare(password, result.password, function(err, res){
                  if(err){
                      reject(err);
                  }else{
                      resolve(result);
                  }
             });
        });
    });
}

userschema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')){
         bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(user.password, salt, (err, hash) => {
                 user.password = hash;
                 next();
              });
         });
    }else{
        next();
    }
});

mongoose.model('User', userschema);