const { userDatabase, sellerDatabase, buyerDatabase, jobDatabase, orderDatabase } = require('./database')
const printOrderHistory = require('./lib/print-order-history')

// seller2.startOrder(seller2.orders[0])
// seller2.finishOrder(seller2.orders[0])
// seller2.cancelOrder(seller2.orders[0])

const user1 = userDatabase.findByUserName('Leyla')
const buyer1 = buyerDatabase.find(user1.id)
const seller1 = sellerDatabase.findByUserName('Mecnun')

buyer1.searchService('pho')

printOrderHistory(buyer1)

