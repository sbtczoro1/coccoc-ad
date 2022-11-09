var jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../configs/env");

module.exports = {
  generate: (obj) => {
    var token = jwt.sign(obj, SECRET_TOKEN, {
      expiresIn: "7d",
    });
    return token;
  },
};
