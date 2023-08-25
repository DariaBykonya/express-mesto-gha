const User = require('../models/user');

// получение всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Некорректно указан id пользователя' });
      }
      return res.status(500).send({
        message: 'Произошла ошибка при получении данных о пользователях',
      });
    });
};

// получение пользователя по id
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(200).send({ data: user.toObject() });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Некорректно указан id пользователя' });
      }
      return res.status(500).send({
        message: 'Произошла ошибка при получении дыннах о пользователях',
      });
    });
};

// создание нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

// обновление данных пользователя
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(200).send({ name: user.name, about: user.about });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
      return res.status(500).send({
        message:
          'Произошла ошибка на сервере при попытке обновления данных профиля',
      });
    });
};

// обновление аватара пользователя
module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  const ownerId = req.user._id;

  User.findByIdAndUpdate(
    ownerId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(200).send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      }
      return res.status(500).send({
        message: 'Произошла ошибка на сервере при попытке обновления аватара',
      });
    });
};
