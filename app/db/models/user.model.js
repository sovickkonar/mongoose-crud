const mongoose = require('mongoose');

const UserScheam = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    gender : String,
    role : String
},{
    timestamps : true
});

const UserModel = mongoose.model('User',UserScheam);

module.exports = UserModel;