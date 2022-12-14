const { body } = require("express-validator");
const { AuthValidateMessage, LoginRules } = require("../constants");

const passwordValidateMessage = AuthValidateMessage.PASSWORD_AT_LEAST.replace(
  "x",
  LoginRules.PASSWORD_MIN_LENGTH
);

module.exports = {
  loginValidation: [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage(AuthValidateMessage.Enter_VALID_EMAIL),
    body("password").isLength({ min: 5 }).withMessage(passwordValidateMessage),
  ],
};
