"use strict";

const User = use("App/Models/User");

class UserRepository {
  async all() {
    return await User.all();
  }

  async save({ username, email, password, role }) {
    const user = new User()
    user.username = username
    user.email = email
    user.password = password
    await user.save();
    await user.roles().attach([role])
    if (user) return true
    return false
}

  async find(id) {
    return await User.find(id);
  }

  async update({ id, body }) {
    const { username, email, password, age } = body;
    const user = await User.find(id);
    user.username = username;
    user.email = email;
    user.password = password;
    user.age = age;
    return await user.save();
  }

  async checkEmail(email) {
    const user = await User.query()
      .where("email", email)
      .first();
    if (user) {
      return true;
    }
    return false;
  }
}

module.exports = UserRepository;
