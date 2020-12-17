const { User } = require('./user')
const Buyer = require('./buyer')
const Seller = require('./seller')
const { roles } = require('./user')


const user1 = new User(1, roles.BUYER, 'ahmet')
const buyer1 = new Buyer(user1)
const seller1 = new Seller(user1)

const user2 = new User(2, roles.SELLER, 'ayşe')
const buyer2 = new Buyer(user2)
const seller2 = new Seller(user2)

seller2.addSpecialty('Web Development', 10)
seller2.updateProfile('Turkey', 'I created Facebook')

seller2.createJob(1, 'Photoshop', 'Photoshop Master', 30, 3)
seller2.createJob(2, 'Wordpress', 'All kind of websites', 50, 7)


buyer1.buy(seller2.jobs[0])
buyer1.buy(seller2.jobs[1])

seller2.startOrder(seller2.orders[0])

seller2.finishOrder(seller2.orders[0])

seller2.cancelOrder(seller2.orders[0])

user2.changeRole()
user2.changeRole()
user2.changeRole()

user1.sendMessage(user2, seller2.jobs[0], 'A message example')
user2.sendMessage(user1, seller2.jobs[0], 'A sample response')

buyer1.rateAndComment(buyer1.orders[0], 4, 'Great job!')
buyer1.rateAndComment(buyer1.orders[1], 2, 'Shitty job!')

function printBoughtOrders(buyer) {
  buyer.orders.forEach(printOrder)
}

function printOrder(order){
  console.log(`${order.buyer.name} bought ${order.job.title} for ${order.job.price} dollars from ${order.job.seller.name}`)
}

printBoughtOrders(buyer1)


