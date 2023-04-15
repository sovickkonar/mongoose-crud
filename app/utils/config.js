require('dotenv').config();


module.exports = {
    PORT : process.env.PORT,
    DB_NAME : process.env.DB_NAME,
    SALT_ROUNDS : process.env.SALT_ROUNDS
}