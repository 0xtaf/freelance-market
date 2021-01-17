const express = require('express')
const indexRouter = require('./routes/index')
const employersRouter = require('./routes/employers')
const freelancersRouter = require('./routes/freelancers')
const ordersRouter = require('./routes/orders')
const jobsRouter = require('./routes/jobs')
require('./mongo-connection')

const app = express()

app.use(express.json())

app.set('view engine', 'pug')

app.use('/employers', employersRouter)
app.use('/freelancers', freelancersRouter)
app.use('/orders', ordersRouter)
app.use('/jobs', jobsRouter)
app.use('/', indexRouter)

app.listen(3000, () => {
  console.log("started listening on port 3000")
})
