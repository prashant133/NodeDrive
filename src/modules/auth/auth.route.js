const router = require("express").Router();

const validatorError = require("../../middlewares/validateError.middleware");
const registrationValidator = require("./auth.validate");
const authController = require("./auth.controller");

router.post(
  "/register",
  registrationValidator,
  validatorError,
  authController.registration,
);

module.exports = router;
