const BaseDatabase = require('./base-database')
const Freelancer = require('../models/freelancer')

class FreelancerDatabase extends BaseDatabase {
  findByUserName(name) {
    return this.findBy('name', name)
  }
}

module.exports = new FreelancerDatabase(Freelancer)