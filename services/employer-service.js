const BaseService = require('./base-service')
const orderService = require('./order-service')
const jobService = require('./job-service')
const Employer = require('../models/employer')

class EmployerService extends BaseService {
  async buy(employerId, jobId) {
    const employer = await this.find(employerId)
    const job = await jobService.find(jobId)
    const freelancer = job.freelancer

    const order = await orderService.insert({
      employer,
      job,
      status: 'todo',
      price: job.price,
      deliveryTime: job.deliveryTime
    })
    employer.orders.push(order)
    freelancer.orders.push(order)
    job.employers.push(employer)

    await employer.save()
    await job.save()
    await freelancer.save()

    return order
  }

  async comment(employerId, jobId, text, rating) {
    const employer = await this.find(employerId)
    const job = await jobService.find(jobId)

    const index = employer.orders.findIndex(item => item.job._id == jobId)
    if (index == -1) throw new Error('Cannot find job')

    const comment = { text, rating }

    job.comments.push(comment)
    await job.save()

    return comment
  }
}

module.exports = new EmployerService(Employer)
