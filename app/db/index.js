const mongoose = require('mongoose');
const { DB_NAME } = require('../utils/config');
const connectionToDb = async()=>{
    try{
        await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);
        console.log('Database connection successful!')
    }catch(err){
        process.exit(1);
    }
}

module.exports = {
    connectionToDb
}