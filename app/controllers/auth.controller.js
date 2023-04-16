const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken'); 
const User = require('../db/models/user.model');
const { server_error, new_user_registeration_successfull, user_already_exists, login_success, login_failed }  = require('../utils/messages');
const { SALT_ROUNDS, SECRET_KEY, JWT_REFRESH_SECRET } = require('../utils/config');

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

const loginUserUsingEmailAndPassword = async ( req, res ) => {
    try{

        const { email, password } = req.body.data;

        const user = await User.findOne({
            email : email
        });

        if(!user){
            return res.status(login_failed.code).json({
                status  : 'error',
                message : login_failed.message 
            })
        }

        const password_comparison = await bcrypt.compare(password,user.password);
        
        if(!password_comparison){
            return res.status(login_failed.code).json({
                status  : 'error',
                message : login_failed.message 
            })
        }else {

            // create Tokens
            const token_body = {
                email : user.email,
                name  : user.name
            };

            const auth_token = jwt.sign(token_body,SECRET_KEY,{
                expiresIn : '10s'
            });

            const refresh_token = jwt.sign(token_body,JWT_REFRESH_SECRET,{
                expiresIn : '1m'
            });

            return res.status(login_success.code).json({
                status : 'success',
                message : login_success.message,
                auth_token : auth_token,
                refresh_token : refresh_token,
                role : user.role
            });

        }
    }catch(err){
        res.status(server_error.code).json({
            status  : 'error',
            message : server_error.message
        })
    }
}


module.exports = {
    registerUserUsingEmailAndPassword,
    loginUserUsingEmailAndPassword
}