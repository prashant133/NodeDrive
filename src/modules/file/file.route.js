const uploadFileValidator = require("./file.validate");
const authMiddleware = require("../../middlewares/auth.middleware");
const fileController = require("./file.controller");
const upload = require("../../config/multer");

const router = require("express").Router();

router.post(
  "/upload",
  authMiddleware,
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

module.exports = router;
