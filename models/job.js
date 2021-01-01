const { v4: uuidv4 } = require('uuid')

class Job {
  constructor(id = uuidv4(), freelancer, title, content, price, deliveryTime, employers=[]){
    this.id = id
    this.freelancer = freelancer
    this.title = title
    this.content = content
    this.price = price
    this.deliveryTime = deliveryTime
    this.employers = employers
  }

  static create({id, freelancer, title, content, price, deliveryTime, employers}) {
    return new Job(id, freelancer, title, content, price, deliveryTime, employers)
  }
}

module.exports = Job