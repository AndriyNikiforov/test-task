const Joi = require('joi');

const validator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    return {
      success: false,
      message: error.details.message,
    };
  }

  return value;
};

module.exports = validator;
