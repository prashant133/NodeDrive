const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const validationMiddleare = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((err) => {
      throw new ApiError(400, "Validation Error", errorMessage);
    });
  }
  return next();
};

module.exports = validationMiddleare;
