const { User } = require('../../db/models');

class AuthService {
  static async signUp({ email, name, password, role }) {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password, role },
    });

    return { user, created };
  }

  static async getUserByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user;
  }
}

module.exports = AuthService;
