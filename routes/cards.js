const router = require('express').Router();
const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardById,
} = require('../middlewares/validation');

router.get('/', getCard);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationCardById, deleteCard);
router.put('/:cardId/likes', validationCardById, likeCard);
router.delete('/:cardId/likes', validationCardById, dislikeCard);

module.exports = router;
