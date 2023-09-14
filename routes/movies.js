const router = require('express').Router();
const { getMovies, addMovies, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', addMovies);
router.delete('/:movieId', deleteMovie);

module.exports = router;
