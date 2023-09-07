const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

// Error
const NotFoundError = require('../errors/NotFoundError');

// Validation
const {
  validationCreateUser,
  validationLogin,
} = require('../middlewares/validation');

// вызов роутеров для пользователей и карточек
router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', users);
router.use('/cards', cards);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
