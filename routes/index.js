const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');

// вызов роутеров для пользователей и карточек
router.use('/users', users);
router.use('/cards', cards);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
