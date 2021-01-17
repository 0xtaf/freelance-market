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
