const app = require('./app');
const { connectionToDb } = require('./app/db');
const { PORT } = require('./app/utils/config');
const base_routes = require('./app/routes');

app.use('/api',base_routes);

app.listen(PORT,async ()=>{
    await connectionToDb();
    console.log(`server running  on : http://localhost:${PORT}`);
})