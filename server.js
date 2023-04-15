const app = require('./app');
const { connectionToDb } = require('./app/db');
const { PORT } = require('./app/utils/config');
app.listen(PORT,async ()=>{
    await connectionToDb();
    console.log(`server running  on : http://localhost:${PORT}`);
})