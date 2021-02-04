function printOrder(order) {
  return console.log(
    `${order.employer.name} bought ${order.job.title} for ${order.job.price} dollars from ${order.job.freelancer.name}`
  )
}

function printOrderHistory(employer) {
  if (employer.orders.length == 0) return console.log(`${employer.name} has no orders yet`)

  employer.orders.forEach(printOrder)
}

module.exports = printOrderHistory
