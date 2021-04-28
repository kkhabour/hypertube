const router = require('express').Router();
const intra = require('../controllers/intra');
const github = require('../controllers/github');



router.post('/intra/login', intra.login);

router.post('/github/login', github.login);






exports.router = router;