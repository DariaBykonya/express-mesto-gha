const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatarUser,
} = require("../controllers/users.js");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatarUser);

module.exports = router;
