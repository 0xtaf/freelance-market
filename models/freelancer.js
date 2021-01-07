const { User } = require('./user')
const Job = require('./job')
const { status } = require('./order')
const orderDatabase = require('../database/order-database')


class Freelancer extends User {
  constructor(id, activeRole, name, messages, country = '', description = '', orders = [], specialty = [], comments = [], rating = 0, jobs = []) {
    super(id, activeRole, name, messages)
    this.country = country
    this.description = description
    this.orders = orders
    this.specialty = specialty
    this.comments = comments
    this.rating = rating
    this.jobs = jobs
  }

  addSpecialty(field, experience){
    const specialty = { field, experience }
    this.specialty.push(specialty)
  }

  updateProfile(country, description) {
    this.country = country
    this.description = description
  }

  async createJob({title, content, price, deliveryTime}){
    const job = await Job.create({freelancer: this, title, content, price, deliveryTime})
    this.jobs.push(job.title)
    return job
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

  static create(user) {
    return new Freelancer(user.id, user.activeRole, user.name, user.messages, user.country, user.description, user.orders, user.specialty, user.comments, user.rating, user.jobs)
  }
}

module.exports = Freelancer