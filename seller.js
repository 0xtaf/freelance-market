const { User } = require('./user')
const Job = require('./job')
const { status } = require('./order')

class Seller extends User {
  constructor(user){
    super(user.id, user.activeRole, user.name)
    this.country = ''
    this.description = ''
    this.orders = []
    this.specialty = []
    this.comments = []
    this.rating = 0
    this.jobs = []
  }

  addSpecialty(field, experience){
    const specialty = { field, experience }
    this.specialty.push(specialty)
  }

  updateProfile(country, description) {
    this.country = country
    this.description = description
  }

  createJob(id, title, content, price, deliveryTime){
    const job = new Job(id, this, title, content, price, deliveryTime)
    this.jobs.push(job)
  }

  startOrder(order){
    order.status = status.INPROGRESS
  }
  finishOrder(order){
    order.status = status.DONE
  }
  cancelOrder(order){
    order.status = status.CANCELED
  }
}

module.exports = Seller