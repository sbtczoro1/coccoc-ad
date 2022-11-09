var bcrypt = require("bcryptjs");

module.exports = {
  compare: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  },
};
