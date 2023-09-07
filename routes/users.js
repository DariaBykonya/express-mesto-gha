const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatarUser,
  currentUser,
} = require('../controllers/users');

const {
  validationUpdateUser,
  validationUpdateAvatar,
  validationUserId,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', currentUser);
router.patch('/me', validationUpdateUser, updateUser);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatarUser);
router.get('/:userId', validationUserId, getUserById);

module.exports = router;
