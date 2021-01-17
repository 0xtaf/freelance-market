// const { v4: uuidv4 } = require('uuid');
// const { status } = require('./order')

const mongoose = require('mongoose')

const FreelancerSchema = mongoose.Schema({
  name: String,
  country: String,
  description: String,
  specialties: [Object],
  comments: Array,
  rating: Number,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      autopopulate: { maxDepth: 2 }
    }
  ],
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      autopopulate: { maxDepth: 1 }
    }
  ]
})

FreelancerSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Freelancer', FreelancerSchema)
