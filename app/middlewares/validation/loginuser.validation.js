const Joi = require('joi');
const { server_error } = require('../../utils/messages');
exports.loginUserValidation = (req,res,next)=>{
    try{

        const userLoginSchema = Joi.object({

            email : Joi.string()
                        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu'] } })
                        .required()
                        .messages({
                        'string.email': 'Please enter a valid email address',
                        'any.required': 'Email is required'
                        }),
            password: Joi.string()
                        .min(8)
                        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:\'"<>,./?])'))
                        .required()
                        .messages({
                        'string.min': 'Password must be at least 8 characters long',
                        'string.pattern.base': 'Password must contain at least one special character, one number, and one capital letter',
                        'any.required': 'Password is required'
                        })
        })
       
        const result = userLoginSchema.validate(req.body.data);
        
        if(result.error === undefined){
            next()
        }else{
            let error_message = result.error.details[0].message;
            return res.status(400).json({
                status  :  'error',
                message : error_message
            })
        }

    }catch(err){
        return res.status(server_error.code).json({
            status  :'error',
            message : server_error.message
        })
    }
}
