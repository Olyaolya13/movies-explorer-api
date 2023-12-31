const mongoose = require("mongoose");
const validator = require("validator");

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "country" - 2'],
    },
    director: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "director" - 2'],
    },
    duration: {
      type: Number,
      required: true,
      minlength: [1, 'Минимальная длина поля "duration" - 1'],
    },
    year: {
      type: String,
      required: true,
      minlength: [4, 'Минимальная длина поля "year" - 4'],
      maxlength: [4, 'Максимальная длина поля "year" - 4'],
    },
    description: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "description" - 2'],
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Некорректный Url",
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Некорректный Url",
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Некорректный Url",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
      unique: true,
    },
    nameRU: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "nameRU" - 2'],
    },
    nameEN: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "nameEN" - 2'],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("movie", movieSchema);
