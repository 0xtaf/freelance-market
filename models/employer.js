const { User } = require('./user')
const { Order } = require('./order')
const jobDatabase = require('../database/job-database')
const fs = require('fs')

const path = process.cwd()+'/database/order.json'

class Employer extends User {
  constructor(id, activeRole, name, messages, orders = []){
    super(id, activeRole, name, messages)
    this.orders = orders
  }

  async searchService(keyword){
    try {
      const job = await jobDatabase.findByKeyword(keyword)
      if (typeof job == 'string') {
        console.log(job)
      } else {
        console.log(`${keyword} için ${job.length} adet ilan bulundu`)
      }
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

  rateAndComment(order, rating, comment) {
    order.rating = rating
    order.comment = comment
  }

  static create(user) {
    return new Employer(user.id, user.activeRole, user.name, user.messages, user.orders)
  }
}

module.exports = Employer