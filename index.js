const { userDatabase, freelancerDatabase, employerDatabase, jobDatabase, orderDatabase } = require('./database')
const printOrderHistory = require('./lib/print-order-history')

async function main(){
  try {
    const user1 = await userDatabase.findByUserName('Leyla') 
    const user2 = await userDatabase.findByUserName('Mecnun') 
    const employer1 = await employerDatabase.find(user1.id) 
    const freelancer2 = await freelancerDatabase.findByUserName('Mecnun')
  
    const jobs = await jobDatabase.findByKeyword('wordpress')
    // await employer1.buy(jobs[0]) 
    // await user1.sendMessage(user2, jobs[0], 'Another message example')
    // await userDatabase.update(user1)
    // await userDatabase.update(user2)

    // const orders = await orderDatabase.load()
    // await freelancer2.finishOrder(orders[0])
    // await freelancer2.startOrder(orders[1])
    // await freelancer2.cancelOrder(orders[2])
    // await user1.changeRole()
    employer1.searchService('pho')
    console.log("Results: ", await employerDatabase.load())
  
    printOrderHistory(employer1)
  } catch (e) {
    console.log(e)
  }
}


main()
