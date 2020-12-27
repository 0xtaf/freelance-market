const BaseDatabase = require('./base-database')
const Employer = require('../models/employer')
const fs = require('fs')
const flatted = require('flatted')

class EmployerDatabase extends BaseDatabase {

}

module.exports = new EmployerDatabase(Employer)