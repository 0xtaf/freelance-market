const { User } = require('./user')
const Job = require('./job')
const { status } = require('./order')

class Freelancer extends User {
  constructor(id, activeRole, name, messages, country = '', description = '', orders = [], specialties = [], comments = [], rating = 0, jobs = []) {
    super(id, activeRole, name, messages)
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
    return new Freelancer(user.id, user.activeRole, user.name, user.messages, user.country, user.description, user.orders, user.specialties, user.comments, user.rating, user.jobs)
  }
}

module.exports = Freelancer