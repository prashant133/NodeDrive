const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const shareController = require("./share.controller");

router.post("/:fileId", authMiddleware, shareController.createShareLink);
router.get("/:token", shareController.accessSharedFile);

module.exports = router;
