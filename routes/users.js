const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatarUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatarUser);
router.post('/', createUser);
router.get('/:userId', getUserById);

module.exports = router;
