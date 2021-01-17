// const { Order, status } = require('./order')
// const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose')

const EmployerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      autopopulate: { maxDepth: 2 }
    }
  ]
})

EmployerSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Employer', EmployerSchema)
