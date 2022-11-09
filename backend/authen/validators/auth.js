const { body } = require("express-validator");
const { AuthValidate, LoginRules } = require("../constants");

const passwordValidateMessage = AuthValidate.PASSWORD_AT_LEAST.replace(
  "x",
  LoginRules.PASSWORD_MIN_LENGTH
);

module.exports = {
  loginValidation: [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage(AuthValidate.Enter_VALID_EMAIL),
    body("password").isLength({ min: 5 }).withMessage(passwordValidateMessage),
  ],
};
