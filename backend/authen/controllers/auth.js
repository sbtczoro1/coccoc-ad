const { validationResult } = require("express-validator");
const { compare } = require("../../helpers/password");
const { generate } = require("../../helpers/token");
const AuthRepository = require("../repository");
const { AuthErrorMessage } = require("../constants");

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const userByEmail = AuthRepository.findUserByEmail(email);

  if (!userByEmail) {
    return res.status(401).json({
      errors: [
        {
          msg: `${email} ${AuthErrorMessage.USER_NOT_EXIST}`,
        },
      ],
    });
  }

  const isSamePassword = compare(password, userByEmail.password_hash);
  if (!isSamePassword) {
    return res.status(401).json({
      errors: [
        {
          msg: AuthErrorMessage.USER_INFO_WRONG,
        },
      ],
    });
  }

  const token = generate({ email });

  return res.status(200).json({
    token,
    user: {
      email,
    },
  });
};

module.exports = {
  login,
};
