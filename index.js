const { userDatabase, freelancerDatabase, employerDatabase, jobDatabase, orderDatabase } = require('./database')
const printOrderHistory = require('./lib/print-order-history')


const user1 = userDatabase.findByUserName('Leyla')
const employer1 = employerDatabase.find(user1.id)
const freelancer2 = freelancerDatabase.findByUserName('Mecnun')

const job = jobDatabase.findByKeyword('wordpress')[0]
const order = employer1.buy(job)

// orderDatabase.remove(2)
orderDatabase.insert(order)
freelancer2.finishOrder(order)
orderDatabase.update(order)


employer1.searchService('pho')

printOrderHistory(employer1)

