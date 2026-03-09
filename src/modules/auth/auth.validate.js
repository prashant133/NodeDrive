const { body } = require("express-validator");

const registrationValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").notEmpty().withMessage("Password if required"),
];

const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Invalid Password"),
];

module.exports = { registrationValidator, loginValidator };
