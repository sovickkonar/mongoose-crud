const Joi = require('joi');

exports.registerUserValidation = (req,res,next)=>{
    try{

        const userRegisterSchema = Joi.object({
            name : Joi.string()
                        .min(2)
                        .max(50)
                        .pattern(new RegExp(/^[a-zA-Z\s]*$/))
                        .required()
                        .messages({
                        'string.base': 'Name must be a string',
                        'string.empty': 'Name is required',
                        'string.min': 'Name must be at least {#limit} characters long',
                        'string.max': 'Name must be at most {#limit} characters long',
                        'string.pattern.base': 'Name may only contain letters and spaces'
                        }),
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
                        }),
            gender : Joi.string()
                        .valid('male', 'female', 'others')
                        .required()
                        .messages({
                        'any.only': 'Gender must be "male", "female", or "others"',
                        'any.required': 'Gender is required'
                        })
        })
       
        const result = userRegisterSchema.validate(req.body.data);
        
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
        return res.status(500).json({
            status  :  'error',
            message : 'Internal Server Error: Oops, something went wrong on the server.'
        })
    }
}
