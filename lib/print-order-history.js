function printOrderHistory(buyer) {
  buyer.orders.forEach(printOrder)
}

function printOrder(order){
  return console.log(`${order.buyer.name} bought ${order.job.title} for ${order.job.price} dollars from ${order.job.seller.name}`)
}

module.exports = printOrderHistory