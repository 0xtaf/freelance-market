const { userDatabase, freelancerDatabase, employerDatabase, jobDatabase, orderDatabase } = require('./database')
const printOrderHistory = require('./lib/print-order-history')

async function main(){
  try {
    const user1 = await userDatabase.findByUserName('Leyla') 
    const employer1 = await employerDatabase.find(user1.id) 
    const freelancer1 = await freelancerDatabase.find(user1.id) 
    const freelancer3 = await freelancerDatabase.findByUserName('Erdal')
    
    // const job3 = freelancer3.createJob({title: 'Translation', content: 'Eng-Tur', price:  100, deliveryTime: 6 })
    // await jobDatabase.insert(job3)

    // const order3 = await employer1.buy(job3) 
    // await orderDatabase.insert(order3)
    // await employerDatabase.update(employer1)
    // await freelancerDatabase.update(freelancer3)

    user1.changeRole()
    employer1.changeRole()
    freelancer1.changeRole()
    
    await userDatabase.update(user1)
    await employerDatabase.update(employer1)
    await freelancerDatabase.update(freelancer1)

    employer1.searchService('pho')
    console.log("Results: ", await freelancerDatabase.load())
  
    printOrderHistory(employer1)
  } catch (e) {
    console.log(e)
  }
}


main()
