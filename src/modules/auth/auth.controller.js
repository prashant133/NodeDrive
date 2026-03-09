const asyncHandler = require("../../utils/asyncHandler");
const authService = require("./auth.service");
const ApiResponse = require("../../utils/ApiResponse");

const registration = asyncHandler(async (req, res, next) => {
  const user = await authService.registration(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Created successfully"));
});

module.exports = { registration };
