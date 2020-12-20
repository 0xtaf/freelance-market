const { v4: uuidv4 } = require('uuid')

class Job {
  constructor(id = uuidv4(), seller, title, content, price, deliveryTime, buyers=[]){
    this.id = id
    this.seller = seller
    this.title = title
    this.content = content
    this.price = price
    this.deliveryTime = deliveryTime
    this.buyers = buyers
  }

  static create({id, seller, title, content, price, deliveryTime, buyers}) {
    return new Job(id, seller, title, content, price, deliveryTime, buyers)
  }
}

module.exports = Job