const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
  title: String,
  content: String,
  price: Number,
  deliveryTime: Number,
  comments: Array,
  employers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employer', autopopulate: { maxDepth: 1 } }],
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Freelancer',
    autopopulate: { maxDepth: 2 }
  }
})

JobSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Job', JobSchema)
