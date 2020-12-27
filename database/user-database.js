const BaseDatabase = require('./base-database')
const { User } = require('../models/user')

class UserDatabase extends BaseDatabase {
  async findByUserName(name) {
    return await this.findBy('name', name)
  }
}

module.exports = new UserDatabase(User)