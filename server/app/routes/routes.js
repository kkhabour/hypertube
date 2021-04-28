const router = require('express').Router();
const auth = require('./auth');
const account = require('./account');
const confirm = require('./confirm');
const movies = require('./movie.js');
const onmniauth = require('./omniauth');
const token = require('../utils/token');


const movie = require('../controllers/movie');
const subtitles = require('../controllers/subtitles');

router.use('/auth', auth.router);
router.use('/omniauth', onmniauth.router);
router.use('/confirm', confirm.router);
router.use('/account', token.verify, account.router);
router.use('/movie', token.verify, movies.router);

router.get('/stream/:token/:id/:imdb/:hash', movie.stream);


router.get('/subtitle/:imdb/:lang', subtitles.subtitle);






exports.router = router;