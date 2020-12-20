const BaseDatabase = require('./base-database')
const { User } = require('../models/user')

class UserDatabase extends BaseDatabase {
  findByUserName(name) {
    return this.findBy('name', name)
  }
}

module.exports = new UserDatabase(User)