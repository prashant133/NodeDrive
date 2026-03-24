const validatorError = require("../../middlewares/validateError.middleware");
const { registrationValidator, loginValidator } = require("./auth.validate");
const authController = require("./auth.controller");
const loginRateLimit = require("../../middlewares/loginRateLimit.middleware");

const router = require("express").Router();

router.post(
  "/register",
  registrationValidator,
  validatorError,
  authController.registration,
);

router.post("/login",loginRateLimit, loginValidator, validatorError, authController.login);

module.exports = router;
