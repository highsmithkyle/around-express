const router = require("express").Router();
const { BAD_REQUEST } = require("../utils/apploication_constants");

const userRouter = require("./users");
const cardRouter = require("./cards");

router.use("/users", userRouter);
router.use("/cards", cardRouter);

router.use((req, res) => {
  res.status(BAD_REQUEST).send({ message: "Requested resource not found" });
});

module.exports = router;
