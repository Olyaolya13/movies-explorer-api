const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ userId })
    .then((movies) => {
      res.status(HTTP_STATUS_OK).send(movies);
    })
    .catch(() => next(new NotFoundError('Фильмы не найдены')))
    .catch(next);
};

module.exports.addMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.create({ userId, ...req.body })
    .then((movie) => {
      Movie.findById(movie._id)
        .orFail()
        // .populate('owner')
        .then((movies) => res.status(HTTP_STATUS_CREATED).send({ data: movies }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Фильм уже существует'));
          } else { next(err); }
        });
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError('Фильм уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм не найден'));
      }
      if (movie.owner.toString() !== owner) {
        // console.log(owner);
        next(new ForbiddenError('У вас нет прав на удаление этого фильма'));
      } else {
        Movie.findByIdAndDelete(movieId)
          .then(() => {
            res.status(HTTP_STATUS_OK).send({ message: 'Фильм удален' });
          })
          .catch(next);
      }
    })
    .catch(next);
};
