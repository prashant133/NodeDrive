const ApiError = require("../../utils/ApiError");

const uploadFileValidator = (req, res, next) => {
  if (!req.files) {
    throw new ApiError(400, "file is required");
  }
  next();
};

module.exports = uploadFileValidator;
