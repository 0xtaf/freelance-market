const { v4: uuidv4 } = require('uuid')

const status = {
  TODO: "todo",
  INPROGRESS: "inprogress",
  DONE: "done",
  CANCELED: "canceled"
}

Object.freeze(status);

class Order {
  constructor(id = uuidv4(), employer, job, price = job.price, status = 'todo', rating = 0, comment = '', date = new Date()) {
    this.id = id
    this.employer = employer
    this.job = job
    this.price = price
    this.status = status
    this.rating = rating
    this.comment = comment
    this.date = date
  }

  static create({id, employer, job, status, rating, comment, date}) {
    return new Order(id, employer, job, job.price, status, rating, comment, date)
  }
}

module.exports = {Order, status}