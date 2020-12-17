const status = {
  TODO: "todo",
  INPROGRESS: "inprogress",
  DONE: "done",
  CANCELED: "canceled"
}

Object.freeze(status);

class Order {
  constructor(buyer, job){
    this.buyer = buyer
    this.job = job
    this.price = job.price
    this.status = status.TODO
    this.rating = 0
    this.comment = ''
    this.date = new Date()
  }
}

module.exports = {Order, status}