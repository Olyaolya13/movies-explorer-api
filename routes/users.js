const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const {
  validateUserInfo,
  validateUpdateUserInfo,
} = require('../middlewares/validation');

router.get('/me', validateUserInfo, getUserInfo);

router.patch('/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
