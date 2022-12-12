const Card = require('../models/card');
const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  CREATED_STATUS,
  MESSAGE_REQUEST_ERROR,
  MESSAGE_NOT_FOUND_ERROR,
  MESSAGE_FORBIDDEN_ERROR,
} = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
//    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_STATUS).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(MESSAGE_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(MESSAGE_NOT_FOUND_ERROR))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove()
          .then(() => res.send({ message: 'Удалено' }))
          .catch(next);
      } else {
        next(new ForbiddenError(MESSAGE_FORBIDDEN_ERROR));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError(MESSAGE_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

const likeHandler = (req, res, next, handler) => {
  Card.findByIdAndUpdate(req.params.cardId, handler, { new: true })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      throw new NotFoundError(MESSAGE_NOT_FOUND_ERROR);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError(MESSAGE_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  likeHandler(req, res, next, { $addToSet: { likes: req.user._id } });
};

const dislikeCard = (req, res, next) => {
  likeHandler(req, res, next, { $pull: { likes: req.user._id } });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
