const BaseDatabase = require('./base-database')
const Job = require('../models/job')

class JobDatabase extends BaseDatabase {
  findByKeyword(keyword) {
    if (keyword) {
      const results = this.load().filter(o => o.title.toLowerCase().includes(keyword.toLowerCase()))
      results.forEach(job => console.log(job.title))
      return results
    } else {
      return "There's no job matching with your keyword."
    }
  }
}

module.exports = new JobDatabase(Job)