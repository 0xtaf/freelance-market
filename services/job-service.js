const BaseService = require('./base-service')
const Job = require('../models/job')

class JobService extends BaseService {
  async findByKeyword(keyword) {
    const results = await this.query(keyword)

    return results
  }
}

module.exports = new JobService(Job)
