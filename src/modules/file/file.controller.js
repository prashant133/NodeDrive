const ApiResponse = require("../../utils/ApiResponse");
const asyncHanlder = require("../../utils/asyncHandler");
const fileUpload = require("./file.service");
const fileService = require("./file.service");

const fileUploadController = asyncHanlder(async (req, res, next) => {
  const ownerId = req.user.userId;
  const files = req.files;

  const data = await fileService.fileUpload({ files, ownerId });

  return res
    .status(200)
    .json(new ApiResponse(200, data, "file upload successfully"));
});

const fileDeleteController = asyncHanlder(async (req, res, next) => {
  console.log("file");
});

module.exports = { fileUploadController, fileDeleteController };
