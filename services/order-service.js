const BaseService = require('./base-service')
const Order = require('../models/order')

class OrderService extends BaseService {}

module.exports = new OrderService(Order)
