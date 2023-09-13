const router = require('express').Router();
const { getMovies, addMovies } = require('../controllers/movies');

router.get('/', getMovies); // отработал
router.post('/', addMovies);
// router.delete('/_id ', deleteMovie);

module.exports = router;
