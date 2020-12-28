const BaseDatabase = require('./base-database')
const Job = require('../models/job')

class JobDatabase extends BaseDatabase {
  async findByKeyword(keyword) {
    const objects = await this.load()
    const results = objects.filter((o) => o.title.toLowerCase().includes(keyword.toLowerCase()))
    results.forEach(job => console.log(job.title))

    return results
  }
}

module.exports = new JobDatabase(Job)
