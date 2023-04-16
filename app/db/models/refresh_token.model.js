const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
    user_id : mongoose.Schema.Types.ObjectId,
    refresh_token : String
});

const RefreshTokenModel = mongoose.model('RefreshToken',RefreshTokenSchema);

module.exports = RefreshTokenModel;