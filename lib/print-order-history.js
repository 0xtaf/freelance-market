const freelancerDatabase = require('../database/freelancer-database')

function printOrderHistory(employer) {
  employer.orders.forEach(printOrder)
}

async function printOrder(order){
  const freelancer = await freelancerDatabase.findBy('id', order.job.freelancer)
  return console.log(`${order.employer.name} bought ${order.job.title} for ${order.job.price} dollars from ${freelancer.name}`)
}

module.exports = printOrderHistory