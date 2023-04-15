const bcrypt = require('bcrypt');
const User = require('../db/models/user.model');
const { server_error, new_user_registeration_successfull, user_already_exists }  = require('../utils/messages');
const { SALT_ROUNDS } = require('../utils/config');

const registerUserUsingEmailAndPassword = async ( req, res)=>{
    try{
        const { email, password , gender , name } = req.body.data;

        // check if the email exists

        const user_exists = await User.findOne({
            email : email
        });

        if(user_exists){
            return res.status(user_already_exists.code).json({
                status   :  'error',
                message  : user_already_exists.message
            });
        }else{

            const hashed_password = await bcrypt.hash(password,parseInt(SALT_ROUNDS));
            
            let new_user = new User({
                email : email,
                password : hashed_password,
                name : name,
                gender : gender,
                role : 'basic'
            });

            await new_user.save();
        }
        
        return res.status(new_user_registeration_successfull.code).json({
            status : "success",
            message : new_user_registeration_successfull.message
        })

    }catch(err){
        console.log(err.message);
        return res.status(server_error.code).json({
            status   : 'error',
            message  : server_error.message
        })
    }
}

module.exports = {
    registerUserUsingEmailAndPassword
}