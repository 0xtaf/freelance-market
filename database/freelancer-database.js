const BaseDatabase = require('./base-database')
const Freelancer = require('../models/freelancer')

class FreelancerDatabase extends BaseDatabase {
  async findByUserName(name) {
    return await this.findBy('name', name)
  }
}

module.exports = new FreelancerDatabase(Freelancer)