const { User } = require('./user')
const { Order } = require('./order')

function calculateSellerRating(order, rating) {
  const ratedOrders = order.job.seller.orders.filter(order => order.comment != '')
  order.job.seller.rating = (order.job.seller.rating + rating) / (ratedOrders.length)
}

class Buyer extends User {
  constructor(user){
    super(user.id, user.activeRole, user.name)
    this.orders = []
  }

  searchService(){
    return 'do after the db implementation'
  }

  buy(job) {
    const order = new Order(this, job)
    this.orders.push(order)
    job.seller.orders.push(order)
  }

  rateAndComment(order, rating, comment) {
    order.rating = rating
    order.comment = comment

    calculateSellerRating(order, rating)
  }
}

module.exports = Buyer