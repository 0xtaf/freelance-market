class Job {
  constructor(id, seller, title, content, price, deliveryTime){
    this.id = id
    this.seller = seller
    this.title = title
    this.content = content
    this.price = price
    this.deliveryTime = deliveryTime
    this.buyers = []
  }
}

module.exports = Job