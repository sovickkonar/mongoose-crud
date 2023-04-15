const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const { registerUserValidation } = require('../middlewares/validation/registeruser.validation');
const { loginUserValidation } = require('../middlewares/validation/loginuser.validation')

router.post(
    '/register-user',
    registerUserValidation,
    controller.registerUserUsingEmailAndPassword
);

router.post(
    '/login-user',
    loginUserValidation,
    controller.loginUserUsingEmailAndPassword
)

module.exports = router;