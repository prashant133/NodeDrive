const asyncHandler = require("../../utils/asyncHandler");
const shareService = require("./share.service");
const ApiResponse = require("../../utils/ApiResponse");

const createShareLink = asyncHandler(async (req, res, next) => {
  const ownerId = req.user.userId;
  const fileId = req.params.fileId;

  const shareLink = await shareService.createShareLink({ ownerId, fileId });

  return res
    .status(200)
    .json(new ApiResponse(200, shareLink, "file link created"));
});

const accessSharedFile = asyncHandler(async (req, res, next) => {
  const token = req.params.token;

  const fileUrl = await shareService.accessSharedFile({ token });

  return res.redirect(fileUrl);
});

module.exports = { createShareLink, accessSharedFile };
