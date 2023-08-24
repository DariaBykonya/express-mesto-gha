const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "64e6669ae97f88164a3ebdac",
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
