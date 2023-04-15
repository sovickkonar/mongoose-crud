const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const {registerUserValidation} = require('../middlewares/validation/registeruser.validation');
router.post('/register-user',registerUserValidation,controller.registerUserUsingEmailAndPassword);


module.exports = router;