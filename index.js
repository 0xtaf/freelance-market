const { userDatabase, sellerDatabase, buyerDatabase, jobDatabase, orderDatabase } = require('./database')
const printOrderHistory = require('./lib/print-order-history')


const user1 = userDatabase.findByUserName('Leyla')
const buyer1 = buyerDatabase.find(user1.id)
const seller2 = sellerDatabase.findByUserName('Mecnun')

const job = jobDatabase.findByKeyword('wordpress')[0]
const order = buyer1.buy(job)

// orderDatabase.remove(2)
orderDatabase.insert(order)
seller2.finishOrder(order)
orderDatabase.update(order)


buyer1.searchService('pho')

printOrderHistory(buyer1)

