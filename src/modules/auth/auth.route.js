const validatorError = require("../../middlewares/validateError.middleware");
const {registrationValidator} = require("./auth.validate");
const authController = require("./auth.controller");

const router = require("express").Router();

router.post(
  "/register",
  registrationValidator,
  validatorError,
  authController.registration,
);

module.exports = router;
