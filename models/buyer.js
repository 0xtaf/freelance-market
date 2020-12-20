const { User } = require('./user')
const { Order } = require('./order')
const jobDatabase = require('../database/job-database')

function calculateSellerRating(order, rating) {
  const ratedOrders = order.job.seller.orders.filter(order => order.comment != '')
  order.job.seller.rating = (order.job.seller.rating + rating) / (ratedOrders.length)
}

class Buyer extends User {
  constructor(id, activeRole, name, messages, orders = []){
    super(id, activeRole, name, messages)
    this.orders = orders
  }

  searchService(keyword){
    const job = jobDatabase.findByKeyword(keyword)
    if (typeof job == 'string') {
      console.log(job)
    } else {
      console.log(`${keyword} için ${job.length} adet ilan bulundu`)
    }
  }

  buy(job) {
    const order = Order.create({buyer: this, job})
    this.orders.push(order)
    job.seller.orders.push(order)
    job.buyers.push(this.name)
    return order
  }

  rateAndComment(order, rating, comment) {
    order.rating = rating
    order.comment = comment
    
    calculateSellerRating(order, rating)
  }

  static create({id, activeRole, name, messages, orders}) {
    return new Buyer(id, activeRole, name, messages, orders)
  }
}

module.exports = Buyer