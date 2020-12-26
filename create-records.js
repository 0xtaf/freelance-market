const { User } = require('./models/user')
const Employer = require('./models/employer')
const Freelancer = require('./models/freelancer')

const { userDatabase, freelancerDatabase, employerDatabase, jobDatabase, orderDatabase } = require('./database')

const user1 = User.create({ name: 'Leyla' })
const employer1 = Employer.create({id: user1.id, activeRole:user1.activeRole, name:user1.name, messages:user1.messages})
const freelancer1 = Freelancer.create({id: user1.id, activeRole:user1.activeRole, name:user1.name, messages:user1.messages})

const user2 = User.create({ name: 'Mecnun'} )
const employer2 = Employer.create({id: user1.id, activeRole:user1.activeRole, name:user1.name, messages:user1.messages})
const freelancer2 = Freelancer.create({id:user2.id, activeRole:user2.activeRole, name:user2.name, messages:user2.messages})

// const user3 = User.create({ name: 'Erdal' })
// const employer3 = Employer.create({ user: user3 })
// const freelancer3 = Freelancer.create({ user: user3 })

freelancer2.addSpecialty('Web Development', 10)
freelancer2.updateProfile('Turkey', 'I created Facebook')

const job1 = freelancer2.createJob({title: 'Photoshop', content: 'Photoshop Master', price:  30, deliveryTime: 3 })
const job2 = freelancer2.createJob({title: 'Wordpress', content: 'All kind of websites', price: 50, deliveryTime:  7 })


const order1 = employer1.buy(job1)
const order2 = employer1.buy(job2)

user1.sendMessage(user2, job1, 'A message example')
user2.sendMessage(user1, job1, 'A sample response')

employer1.rateAndComment(order1, 4, 'Great job!')
employer1.rateAndComment(order2, 2, 'Shitty job!')

userDatabase.save([user1, user2])
employerDatabase.save([employer1, employer2])
freelancerDatabase.save([freelancer1, freelancer2])
jobDatabase.save([job1, job2])
orderDatabase.save([order1, order2])
