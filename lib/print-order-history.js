function printOrderHistory(employer) {
  employer.orders.forEach(printOrder)
}

function printOrder(order){
  return console.log(`${order.employer.name} bought ${order.job.title} for ${order.job.price} dollars from ${order.job.freelancer.name}`)
}

module.exports = printOrderHistory