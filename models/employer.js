const { User } = require('./user')
const { Order } = require('./order')
const jobDatabase = require('../database/job-database')
const fs = require('fs')

class Employer extends User {
  constructor(id, activeRole, name, messages, orders = []){
    super(id, activeRole, name, messages)
    this.orders = orders
  }

  async searchJob(keyword){
    try {
      const job = await jobDatabase.findByKeyword(keyword)
      job.length 
        ? console.log(`${keyword} için ${job.length} adet ilan bulundu`) 
        : console.log(`${keyword} için sonuç bulunamadı`)
    } catch (e) {
      console.log(e)
    }
  }

  async buy(job) {
    const order = Order.create({employer: this, job})
    this.orders.push(order)
    job.freelancer.orders.push(order)
    job.employers.push(this.name)
    return order
  }

  async rateAndComment(order, rating, comment) {
    order.rating = rating
    order.comment = comment
  }

  static create(user) {
    return new Employer(user.id, user.activeRole, user.name, user.messages, user.orders)
  }
}

module.exports = Employer