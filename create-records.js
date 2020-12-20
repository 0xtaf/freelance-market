const { User } = require('./models/user')
const Buyer = require('./models/buyer')
const Seller = require('./models/seller')

const { userDatabase, sellerDatabase, buyerDatabase, jobDatabase, orderDatabase } = require('./database')

const user1 = User.create({ name: 'Leyla' })
const buyer1 = Buyer.create({id: user1.id, activeRole:user1.activeRole, name:user1.name, messages:user1.messages})
const seller1 = Seller.create({id: user1.id, activeRole:user1.activeRole, name:user1.name, messages:user1.messages})

const user2 = User.create({ name: 'Mecnun'} )
const buyer2 = Buyer.create({id: user1.id, activeRole:user1.activeRole, name:user1.name, messages:user1.messages})
const seller2 = Seller.create({id:user2.id, activeRole:user2.activeRole, name:user2.name, messages:user2.messages})

// const user3 = User.create({ name: 'Erdal' })
// const buyer3 = Buyer.create({ user: user3 })
// const seller3 = Seller.create({ user: user3 })

seller2.addSpecialty('Web Development', 10)
seller2.updateProfile('Turkey', 'I created Facebook')

const job1 = seller2.createJob({title: 'Photoshop', content: 'Photoshop Master', price:  30, deliveryTime: 3 })
const job2 = seller2.createJob({title: 'Wordpress', content: 'All kind of websites', price: 50, deliveryTime:  7 })


const order1 = buyer1.buy(job1)
const order2 = buyer1.buy(job2)

user1.sendMessage(user2, job1, 'A message example')
user2.sendMessage(user1, job1, 'A sample response')

buyer1.rateAndComment(order1, 4, 'Great job!')
buyer1.rateAndComment(order2, 2, 'Shitty job!')

userDatabase.save([user1, user2])
buyerDatabase.save([buyer1, buyer2])
sellerDatabase.save([seller1, seller2])
jobDatabase.save([job1, job2])
orderDatabase.save([order1, order2])
