const Job = require('./job')
const { v4: uuidv4 } = require('uuid');
const { status } = require('./order')

class Freelancer {
  constructor(id = uuidv4(), name, country = '', description = '', orders = [], specialties = [], comments = [], rating = 0, jobs = []) {
    this.id = id
    this.name = name
    this.country = country
    this.description = description
    this.orders = orders
    this.specialties = specialties
    this.comments = comments
    this.rating = rating
    this.jobs = jobs
  }

  addSpecialty(field, experience){
    this.specialties.push({ field, experience })
  }

  updateProfile(country, description) {
    this.country = country
    this.description = description
  }

  async createJob({title, content, price, deliveryTime}){
    const job = Job.create({freelancer: this, title, content, price, deliveryTime})
    this.jobs.push(job)
    return job
  }

  async updateJob(jobId, values){
    const index = this.jobs.findIndex(job => job.id == jobId)
    if (index == -1) throw new Error('Cannot find job')

    this.jobs[index].title = values.title
    this.jobs[index].content = values.content
    this.jobs[index].price = values.price
    this.jobs[index].deliveryTime = values.deliveryTime

    return this.jobs[index]
  }

  async removeJob(jobId){
    const index = this.jobs.findIndex(job => job.id == jobId)
    if (index == -1) throw new Error('Cannot find job')
    this.jobs.splice(index, 1)
  }

  resetOrder(order){
    order.status = status.TODO
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

  static create({id, name, country, description, orders, specialties, comments, rating, jobs}) {
    return new Freelancer(id, name, country, description, orders, specialties, comments, rating, jobs)
  }
}

module.exports = Freelancer