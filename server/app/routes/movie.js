const router = require('express').Router();
const movie = require('../controllers/movie');
const token = require('../utils/token');


router.post('/', movie.movie);



router.post('/watchlist', movie.watchlist);
router.get('/watchlist/', movie.getwatchlist);

router.post('/comment', movie.comment);
router.get('/comment/:id', movie.comments);


router.get('/watches', movie.watches);


exports.router = router;