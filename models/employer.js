const { Order, status } = require('./order')
const { v4: uuidv4 } = require('uuid');

class Employer {
  constructor(id = uuidv4(), name, orders = []){
    this.id = id
    this.name = name
    this.orders = orders
  }

  async buy(job) {
    const order = Order.create({employer: this, job, status: status.TODO})
    this.orders.push(order)
    job.freelancer.orders.push(order)
    job.employers.push(this)
    return order
  }

  async comment(job, text, rating) {
    const comment = {text, rating}
    job.comments.push(comment)
    return comment
  }

  static create({id, name, orders}) {
    return new Employer(id, name, orders)
  }
}

module.exports = Employer
