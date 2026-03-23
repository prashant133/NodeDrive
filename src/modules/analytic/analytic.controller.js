const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const analyticService = require("../analytic/analytic.service");

const getFileStats = asyncHandler(async (req, res) => {
  const ownerId = req.user.userId;

  const stats = await analyticService.getFileStats(ownerId);

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "File stats fetched successfully"));
});

module.exports = { getFileStats };
