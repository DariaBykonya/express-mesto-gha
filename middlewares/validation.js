const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/BadRequestError');

const customUrlValidator = (url) => {
  const urlValidate = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

  if (urlValidate.test(url)) {
    return url;
  }
  throw new BadRequestError('Некорректный URL');
};

const customIdValidator = (id) => {
  const idValidate = /^[0-9a-fA-F]{24}$/;

  if (idValidate.test(id)) {
    return id;
  }
  throw new BadRequestError('Некорректный id');
};

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(customUrlValidator),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(customUrlValidator),
  }),
});

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(customUrlValidator),
  }),
});

module.exports.validationCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(customIdValidator),
  }),
});
