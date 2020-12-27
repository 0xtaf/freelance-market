const BaseDatabase = require('./base-database')
const Employer = require('../models/employer')

class EmployerDatabase extends BaseDatabase {

}

module.exports = new EmployerDatabase(Employer)