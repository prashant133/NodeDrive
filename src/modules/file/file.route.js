const uploadFileValidator = require("./file.validate");
const authMiddleware = require("../../middlewares/auth.middleware");
const fileController = require("./file.controller");
const upload = require("../../config/multer");
const uploadRateLimit = require("../../middlewares/uploadRateLimit.middleware");

const router = require("express").Router();

router.post(
  "/upload",
  authMiddleware,
  uploadRateLimit,
  upload.array("file", 12),
  uploadFileValidator,
  fileController.fileUploadController,
);

router.delete(
  "/delete/:fileId",
  authMiddleware,
  fileController.fileDeleteController,
);

router.get("/get", authMiddleware, fileController.getMyFilesController);

router.get("/download/:fileId", authMiddleware, fileController.downloadFile);

module.exports = router;
