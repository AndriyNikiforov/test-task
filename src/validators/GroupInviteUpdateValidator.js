const Joi = require('joi');

const validator = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    user_id: Joi.number().required(),
    group_id: Joi.number().required(),
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
