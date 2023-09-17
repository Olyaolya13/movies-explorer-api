const router = require('express').Router();
const { getMovies, addMovies, deleteMovie } = require('../controllers/movies');
const {
  validateAddMovie,
  validateDeleteMovie,
} = require('../middlewares/validation');

router.get('/', getMovies);

router.post('/', validateAddMovie, addMovies);

router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
