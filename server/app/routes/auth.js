const router = require('express').Router();
const register = require('../controllers/register');
const login = require('../controllers/login');
const reset = require('../controllers/reset');


router.post('/register' ,register.register);
router.post('/login', login.login);
router.post('/reset', reset.password);



exports.router = router;