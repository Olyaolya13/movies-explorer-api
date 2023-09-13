const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo); // отработал
router.patch('/me', updateUserInfo);// отработал

module.exports = router;
