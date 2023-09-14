const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { JWT_SECRET = 'secret-key' } = process.env;

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '1w',
      });
      res.send({ token });
    })
    .catch(() => {
      res.status(500).json({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.createUsers = (req, res) => {
  const {
    name, email, password,
  } = req.body;
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, email, password: hash,
      },
    ))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      console.log(err);
      // if (err.code === 11000) {
      //   next(new ConflictError('Пользователь с данным email уже существует'));
      // } else if (err.name === 'ValidationError') {
      //   next(new BadRequestError(err.message));
      // } else {
      //   next(err);
      // }
    });
};
