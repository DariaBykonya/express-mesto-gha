const Card = require('../models/card');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      return res.status(500).send({
        message: 'Произошла ошибка при получении карточек',
      });
    });
};

module.exports.createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      return res.status(500).send({
        message: 'Произошла ошибка при получении карточек',
      });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена' });
      }

      if (card.owner.toString() !== ownerId) {
        return res
          .status(403)
          .send({ message: 'Вы не можете удалить чужую карточку' });
      }
      return Card.deleteOne(card).then(() => res.status(200).send({ message: 'DELETE' }));
    })
    .catch(() => res.status(400).send({
      message: 'Произошла ошибка при удалении карточки',
    }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: ownerId } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return res
          .status(404)
          .send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.status(200).send({ message: 'LIKE' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные для постановки лайка',
        });
      }
      return res.status(500).send({
        message: 'Ошибка по умолчанию',
      });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res
          .status(404)
          .send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.status(200).send({ message: 'DISLIKE' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Переданы некорректные данные для снятии лайка' });
      }
      return res.status(500).send({
        message: 'Ошибка по умолчанию',
      });
    });
};
