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

const User = mongoose.model('User',UserScheam);

module.exports = User;