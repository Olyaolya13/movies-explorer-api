const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
}), getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserInfo);

module.exports = router;
