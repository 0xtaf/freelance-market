const express = require('express')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const employersRouter = require('./routes/employers')
const freelancersRouter = require('./routes/freelancers')
const ordersRouter = require('./routes/orders')
const jobsRouter = require('./routes/jobs')

const app = express()

app.use(express.json())

app.set('view engine', 'pug')

app.use('/users', usersRouter)
app.use('/employers', employersRouter)
app.use('/freelancers', freelancersRouter)
app.use('/orders', ordersRouter)
app.use('/jobs', jobsRouter)
app.use('/', indexRouter)

app.listen(3000, () => {
  console.log("started listening on port 3000")
})


const { userDatabase, freelancerDatabase, employerDatabase, jobDatabase, orderDatabase } = require('./database')
const printOrderHistory = require('./lib/print-order-history')
const searchJob = require('./lib/search-job')

async function main(){
  try {
    const user1 = await userDatabase.findByUserName('Leyla') 
    const employer1 = await employerDatabase.find(user1.id) 
    const freelancer1 = await freelancerDatabase.find(user1.id) 
    const freelancer3 = await freelancerDatabase.findByUserName('Erdal')
    
    // const job3 = await freelancer3.createJob({title: 'Translation', content: 'Eng-Tur', price:  100, deliveryTime: 6 })
    // await jobDatabase.insert(job3)

    // const order3 = await employer1.buy(job3) 
    // await orderDatabase.insert(order3)
    // await employerDatabase.update(employer1)
    // await freelancerDatabase.update(freelancer3)

    // user1.changeRole()
    // employer1.changeRole()
    // freelancer1.changeRole()
    
    // await userDatabase.update(user1)
    // await employerDatabase.update(employer1)
    // await freelancerDatabase.update(freelancer1)

    console.log("Results: ", (await jobDatabase.load())[0])
    // await searchJob('pho')
  
    // printOrderHistory(employer1)
  } catch (e) {
    console.log(e)
  }
}


main()
