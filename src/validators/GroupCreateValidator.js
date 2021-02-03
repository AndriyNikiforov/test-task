const Joi = require('joi');

const validator = (data) => {
  const schema = Joi.object({
    slug: Joi.string().allow(null),
    owner_id: Joi.number().required(),
    description: Joi.string(),
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
