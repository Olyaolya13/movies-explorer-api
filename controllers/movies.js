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

module.exports.deleteMovie = (req, res) => {
  const { movieId } = req.params;
  // const userId = req.user._id;

  Movie.findByIdAndRemove(movieId) // finfById
    .orFail()
    // .then((card) => {
    //   if (card.owner.toString() !== userId) {
    //     res.status(404).send({ message: 'Нет прав доступа' });
    //   }
    //   return Movie.findByIdAndRemove(movieId);
    // })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(409).send({ message: 'Некорректный _id карточки' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        console.log('yt');
      }
    });
};
