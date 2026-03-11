const validatorError = require("../../middlewares/validateError.middleware");
const { registrationValidator, loginValidator } = require("./auth.validate");
const authController = require("./auth.controller");

const router = require("express").Router();

router.post(
  "/register",
  registrationValidator,
  validatorError,
  authController.registration,
);

router.post("/login", loginValidator, validatorError, authController.login);

module.exports = router;
