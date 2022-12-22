const joi = require("joi");

const bookSchema = joi.object({
  title: joi.string().trim().min(5).max(255).required(),
  shortDescription: joi.string().min(5).max(500).optional().trim(),
  longDescription: joi.string().min(10).optional().trim(),
  year: joi.number().integer().required().max(2022),
  isbn: joi.string().trim().required(),
  price: joi.number().min(0).required(),
  createdAt: joi.date().default(Date.now),
  lastModified: joi.date().default(Date.now),
});

async function BookValidationMiddleware(req, res, next) {
  const bodyPayload = req.body;
  try {
    await bookSchema.validateAsync(bodyPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

module.exports = BookValidationMiddleware;
