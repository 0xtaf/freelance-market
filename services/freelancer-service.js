const BaseService = require('./base-service')
const jobService = require('./job-service')
const orderService = require('./order-service')
const Freelancer = require('../models/freelancer')

class FreelancerService extends BaseService {
  async findByName(name) {
    return await this.findBy('name', name)
  }

  async createJob(freelancerId, title, content, price, deliveryTime) {
    const freelancer = await this.find(freelancerId)
    if (!freelancer) throw new Error('Cannot find freelancer')

    const job = await jobService.insert({ freelancer, title, content, price, deliveryTime })
    freelancer.jobs.push(job)

    await freelancer.save()

    return job
  }

  async updateJob(freelancerId, jobId, title, content, price, deliveryTime) {
    const freelancer = await this.find(freelancerId)
    if (!freelancer) throw new Error('Cannot find freelancer')

    const index = freelancer.jobs.findIndex(job => job.id == jobId)
    if (index == -1) throw new Error('Cannot find job')

    const updatedJob = await jobService.update(jobId, { title, content, price, deliveryTime })
    return updatedJob
  }

  async removeJob(freelancerId, jobId) {
    const freelancer = await this.find(freelancerId)
    if (!freelancer) throw new Error('Cannot find freelancer')

    const index = freelancer.jobs.findIndex(job => job.id == jobId)
    if (index == -1) throw new Error('Cannot find job')

    const updatedJob = await jobService.removeBy('_id', jobId)

    return updatedJob
  }

  async addSpecialty(freelancerId, field, experience) {
    const freelancer = await this.find(freelancerId)
    if (!freelancer) throw new Error('Cannot find freelancer')

    const specialty = { field, experience }
    freelancer.specialties.push(specialty)

    await freelancer.save()

    return specialty
  }

  async changeStatus(freelancerId, orderId, status) {
    const freelancer = await this.find(freelancerId)
    if (!freelancer) throw new Error('Cannot find freelancer')

    const order = await orderService.find(orderId)
    if (!order) throw new Error('Cannot find order')

    const index = freelancer.orders.findIndex(order => order._id == orderId)
    if (index == -1) throw new Error('Cannot find the order for this freelancer')

    switch (status) {
      case 0:
        order.status = 'todo'
        break
      case 1:
        order.status = 'inprogress'
        break
      case 2:
        order.status = 'done'
        break
      case 3:
        order.status = 'canceled'
        break
      default:
        throw new Error('Status Error')
    }

    order.save()

    return order.status
  }
}

module.exports = new FreelancerService(Freelancer)
