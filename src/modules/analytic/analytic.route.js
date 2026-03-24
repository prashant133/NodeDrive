const authMiddleware = require("../../middlewares/auth.middleware");
const analyticController = require("../analytic/analytic.controller");

const router = require("express").Router();

router.get("/stats", authMiddleware, analyticController.getFileStats);
router.get(
  "/download/:fileId",
  authMiddleware,
  analyticController.getDownloadStats,
);

module.exports = router;
