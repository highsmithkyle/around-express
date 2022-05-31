const card = require("../models/card");
const { update } = require("../models/card");
const Card = require("../models/card");

const {
  HTTP_SUCCESS,
  HTTP_CREATED,
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
} = require("../utils/error");

// get request

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(HTTP_SUCCESS).send({ data: cards }))
    .catch(() => {
      res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};

// post request

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(HTTP_CREATED).send({ data: card }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(HTTP_BAD_REQUEST).send({
          message: error.message,
        });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occured on the server" });
      }
    });
};

// delete

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      const error = new Error("No card found for the specified id");
      error.statusCode = HTTP_NOT_FOUND;
      throw error;
    })
    .then((cards) =>
      Card.deleteOne(cards).then((card) => res.send({ data: card }))
    )
    .catch((err) => {
      if (error.name === "CastError") {
        res.status(HTTP_BAD_REQUEST).send({ message: "Invalid card id" });
      } else if (error.statusCode === NOT_FOUND) {
        res.status(HTTP_NOT_FOUND).send({ message: error.message });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: "An error occurred" });
      }
    });
};

const updateLike = (req, res, method) => {
  const currentUser = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No card was found for specified ID");
      error.statusCode = HTTP_BAD_REQUEST;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(HTTP_BAD_REQUEST).send({ message: "invalid card Id" });
      } else if (error.statusCode === "HTTP_NOT_FOUND") {
        res.status(HTTP_NOT_FOUND).send({ message: error.message });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: "An error occured on the server" });
      }
    });
};

const likeCard = (req, res) => updateLike(req, res, "$addToSet");
const dislikeCard = (req, res) => updateLike(req, res, "$pull");

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

// const path = require("path");
// const { readFile } = require("../helpers");
// const { NOTFOUND } = require("dns");

// const USERS_PATH = path.join(__dirname, "../data/cards.json");
