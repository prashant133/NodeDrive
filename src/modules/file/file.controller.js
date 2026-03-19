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
  const fileId = req.params.fileId;
  const ownerId = req.user.userId;

  const deletedFile = await fileService.deleteFiles({ ownerId, fileId });

  return res
    .status(200)
    .json(new ApiResponse(200, deletedFile, "File deleted successfully"));
});

const getMyFilesController = asyncHanlder(async (req, res, next) => {
  const ownerId = req.user.userId;

  const file = await fileService.getMyFiles({ ownerId });

  // console.log(file)

  return res
    .status(200)
    .json(new ApiResponse(200, file, "files successfully fetched"));
});

const downloadFile = asyncHanlder(async (req, res, next) => {
  const fileId = req.params.fileId;
  const ownerId = req.user.userId;

  const downlodedFile = await fileService.downloadFile({ ownerId, fileId });

  return res.redirect(downlodedFile);
});

module.exports = {
  fileUploadController,
  fileDeleteController,
  getMyFilesController,
  downloadFile,
};
