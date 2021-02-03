const Joi = require('joi');

const validator = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    group_id: Joi.number().required(),
    description: Joi.string(),
    base_text: Joi.string(),
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
