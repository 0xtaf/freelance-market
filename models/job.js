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

// const { v4: uuidv4 } = require('uuid')

// class Job {
//   constructor(id = uuidv4(), freelancer, title, content, price, deliveryTime, comments = [] , employers=[]){
//     this.id = id
//     this.freelancer = freelancer
//     this.title = title
//     this.content = content
//     this.price = price
//     this.deliveryTime = deliveryTime
//     this.comments = comments
//     this.employers = employers
//   }

//   static create({id, freelancer, title, content, price, deliveryTime, comments, employers}) {
//     return new Job(id, freelancer, title, content, price, deliveryTime, comments, employers)
//   }
// }

// module.exports = Job
