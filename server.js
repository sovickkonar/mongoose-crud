const app = require('./app');
const { connectionToDb } = require('./app/db');
app.listen(3000,async ()=>{
    await connectionToDb();
    console.log('server started');
})