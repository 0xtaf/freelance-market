const { v4: uuidv4 } = require('uuid')

class Job {
  constructor(id = uuidv4(), freelancer, title, content, price, deliveryTime, ratingsAndComments = [] , employers=[]){
    this.id = id
    this.freelancer = freelancer
    this.title = title
    this.content = content
    this.price = price
    this.deliveryTime = deliveryTime
    this.ratingsAndComments = ratingsAndComments
    this.employers = employers
  }

  static create({id, freelancer, title, content, price, deliveryTime, ratingsAndComments, employers}) {
    return new Job(id, freelancer, title, content, price, deliveryTime, ratingsAndComments, employers)
  }
}

module.exports = Job