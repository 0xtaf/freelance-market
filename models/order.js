// const { v4: uuidv4 } = require('uuid')

// const status = {
//   TODO: "todo",
//   INPROGRESS: "inprogress",
//   DONE: "done",
//   CANCELED: "canceled"
// }

const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    autopopulate: { maxDepth: 2 }
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    autopopulate: { maxDepth: 3 }
  },
  price: Number,
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'done', 'canceled']
  },
  date: { type: Date, default: Date.now }
})

OrderSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Order', OrderSchema)

// Object.freeze(status);

// class Order {
//   constructor(id = uuidv4(), employer, job, status = status.TODO, date = new Date()) {
//     this.id = id
//     this.employer = employer
//     this.job = job
//     this.price = job.price
//     this.status = status
//     this.date = date
//   }

//   static create({id, employer, job, status, date}) {
//     return new Order(id, employer, job, status, date)
//   }
// }

// module.exports = {Order, status}
