const Joi = require('joi');

const validator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string(),
    password: Joi.string().min(6),
    bio: Joi.string(),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    return {
      success: false,
      message: error.details,
    };
  }

  return value;
};

module.exports = validator;
