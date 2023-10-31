const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UnAuthorizedError = require("../errors/unauthorized-error");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Некорректный Email",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Минимальная длина поля "password" - 6'],
      select: false, // не возвращает хеш пароля
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnAuthorizedError("Неправильные почта или пароль");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnAuthorizedError("Неправильные почта или пароль");
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
