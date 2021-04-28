const router = require('express').Router();
const confirm = require('../controllers/confirm');



router.post('/email', confirm.mail);
router.post('/password', confirm.password);


exports.router = router;