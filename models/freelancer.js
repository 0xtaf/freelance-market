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
      autopopulate: { maxDepth: 2 }
    }
  ]
})

FreelancerSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Freelancer', FreelancerSchema)
