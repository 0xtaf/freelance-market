const { v4: uuidv4 } = require('uuid')

const status = {
  TODO: "todo",
  INPROGRESS: "inprogress",
  DONE: "done",
  CANCELED: "canceled"
}

Object.freeze(status);

class Order {
  constructor(id = uuidv4(), employer, job, status = 'todo', date = new Date()) {
    this.id = id
    this.employer = employer
    this.job = job
    this.price = job.price
    this.status = status
    this.date = date
  }

  static create({id, employer, job, status, rating, comment, date}) {
    return new Order(id, employer, job, status, rating, comment, date)
  }
}

module.exports = {Order, status}