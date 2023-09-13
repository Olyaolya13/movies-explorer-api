const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Ваше Имя',
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина поля "password" - 2'],
    select: false, // не возвращает хеш пароля

  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
