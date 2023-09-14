const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, addMovies, deleteMovie } = require('../controllers/movies');
const urlPattern = require('../middlewares/pattern');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2),
    duration: Joi.number().required().min(1),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2).max(250),
    image: Joi.string().required().pattern(urlPattern),
    trailerLink: Joi.string().required().pattern(urlPattern),
    thumbnail: Joi.string().required().pattern(urlPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
}), addMovies);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
