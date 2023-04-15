const bcrypt = require('bcrypt');
const User = require('../db/models/user.model');

const registerUserUsingEmailAndPassword = async ( req, res)=>{
    try{
        const { email, password , gender , name } = req.body.data;

        // check if the email exists

        const user_exists = await User.findOne({
            email : email
        });

        if(user_exists){
            return res.status(401).json({
                status   :  'error',
                message  : ' user exists'
            });
        }else{

            const hashed_password = await bcrypt.hash(password,10);
            
            let new_user = new User({
                email : email,
                password : hashed_password,
                name : name,
                gender : gender,
                role : 'basic'
            });

            await new_user.save();
        }
        
        return res.status(201).json({
            status : "success",
            message : 'new user registered successfully'
        })

    }catch(err){
        return res.status(500).json({
            status   : 'error',
            message  : 'server error'
        })
    }
}

module.exports = {
    registerUserUsingEmailAndPassword
}