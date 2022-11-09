const { listUsers } = require("../mock/users");

class AuthRepository {
  findUserByEmail(email) {
    return listUsers.find((user) => user.email === email);
  }
}

module.exports = new AuthRepository();
