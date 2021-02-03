const Joi = require('joi');

const validator = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    execute_date: Joi.date(),
    group_id: Joi.number(),
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
