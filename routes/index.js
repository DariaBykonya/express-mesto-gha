const users = require("./users.js");
const cards = require("./cards.js");
const router = require("express").Router();

// вызов роутеров для пользователей и карточек
router.use("/users", users);
router.use("/cards", cards);

module.exports = router;
