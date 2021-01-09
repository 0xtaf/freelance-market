const { User } = require('./user')
const { Order, status } = require('./order')

class Employer extends User {
  constructor(id, activeRole, name, messages, orders = []){
    super(id, activeRole, name, messages)
    this.orders = orders
  }

  async buy(job) {
    const order = Order.create({employer: this, job, status: status.TODO})
    this.orders.push(order)
    job.freelancer.orders.push(order)
    job.employers.push(this)
    return order
  }

  async rateAndComment(job, rating, comment) {
    job.ratingsAndComments.push({rating, comment})
  }

  static create(user) {
    return new Employer(user.id, user.activeRole, user.name, user.messages, user.orders)
  }
}

module.exports = Employer