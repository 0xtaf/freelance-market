const BaseDatabase = require('./base-database')
const { Order } = require('../models/order')

class OrderDatabase extends BaseDatabase {

}

module.exports = new OrderDatabase(Order)