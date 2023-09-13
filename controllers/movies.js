const Movie = require('../models/movie');

module.exports.getMovies = (req, res) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch();
};

module.exports.addMovies = (req, res) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(201).send({ data: movie });
    })
    .catch();
};
