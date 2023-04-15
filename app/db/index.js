const mongoose = require('mongoose');

const connectionToDb = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/crud');
        console.log('DB connection : successfull')
    }catch(err){
        process.exit(1);
    }
}

module.exports = {
    connectionToDb
}