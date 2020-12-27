const { User } = require('./user')
const { Order } = require('./order')
const jobDatabase = require('../database/job-database')

function calculateFreelancerRating(order, rating) {
  const ratedOrders = order.job.freelancer.orders.filter(order => order.comment != '')
  order.job.freelancer.rating = (order.job.freelancer.rating + rating) / (ratedOrders.length)
}

class Employer extends User {
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
    try {
      const order = Order.create({employer: this, job})
      this.orders.push(order)
      job.freelancer.orders.push(order)
      job.employers.push(this.name)
      return order
    } catch (e) {
      console.log(e)
    }
  }

  rateAndComment(order, rating, comment) {
    order.rating = rating
    order.comment = comment
    
    calculateFreelancerRating(order, rating)
  }

  static create(user) {
    return new Employer(user.id, user.activeRole, user.name, user.messages, user.orders)
  }
}

module.exports = Employer