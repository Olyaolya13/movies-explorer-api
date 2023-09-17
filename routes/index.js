const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const {
  validateSignIn,
  validateSignUp,
} = require('../middlewares/validation');

const { login, createUsers } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', validateSignIn, login);

router.post('/signup', validateSignUp, createUsers);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
