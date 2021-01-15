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
    const specialty = { field, experience }
    this.specialties.push(specialty)
    return specialty
  }

  updateProfile(country, description) {
    this.country = country
    this.description = description
    return {country: this.country, description: this.description}
  }

  async createJob({title, content, price, deliveryTime}){
    const job = Job.create({freelancer: this, title, content, price, deliveryTime})
    this.jobs.push(job)
    return job
  }

  async updateJob(jobId, values){
    const index = this.jobs.findIndex(job => job.id == jobId)
    if (index == -1) throw new Error('Cannot find job')

    const job = this.jobs[index]
    job.title = values.title
    job.content = values.content
    job.price = values.price
    job.deliveryTime = values.deliveryTime

    return job
  }

  async removeJob(jobId){
    const index = this.jobs.findIndex(job => job.id == jobId)
    if (index == -1) throw new Error('Cannot find job')
    this.jobs.splice(index, 1)
    return 'Successfully removed'
  }

  resetOrder(order){
    order.status = status.TODO
    return order.status
  }
  startOrder(order){
    order.status = status.INPROGRES
    return order.status
  }
  finishOrder(order){
    order.status = status.DONE
    return order.status
  }
  cancelOrder(order){
    order.status = status.CANCELED
    return order.status
  }

  static create({id, name, country, description, orders, specialties, comments, rating, jobs}) {
    return new Freelancer(id, name, country, description, orders, specialties, comments, rating, jobs)
  }
}

module.exports = Freelancer