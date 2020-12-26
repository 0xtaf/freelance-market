const BaseDatabase = require('./base-database')
const Employer = require('../models/employer')
const fs = require('fs')
const flatted = require('flatted')

class EmployerDatabase extends BaseDatabase {
  load() {
    const file = fs.readFileSync(`${__dirname}/${this.filename}.json`, 'utf8')
    const objects = flatted.parse(file)
    return objects.map(this.model.create)
  }
}

module.exports = new EmployerDatabase(Employer)