const Employer = require('./models/employer')
const Freelancer = require('./models/freelancer')

const { freelancerDatabase, employerDatabase, jobDatabase, orderDatabase } = require('./database')

async function main() {
  try {
    const employer1 = Employer.create({ name: 'Employer1' })
    const employer2 = Employer.create({ name: 'Employer2' })

    const freelancer1 = Freelancer.create({ name: 'Freelancer1' })
    const freelancer2 = Freelancer.create({ name: 'Freelancer2' })

    await employerDatabase.save([employer1, employer2])
    await freelancerDatabase.save([freelancer1, freelancer2])

    const job1 = await freelancer2.createJob({title: 'Photoshop', content: 'Photoshop Master', price:  30, deliveryTime: 3 })
    const job2 = await freelancer2.createJob({title: 'Wordpress', content: 'All kind of websites', price: 50, deliveryTime:  7 })
    await jobDatabase.save([job1, job2])

    const order1 = await employer1.buy(job1)
    const order2 = await employer1.buy(job2)
    await orderDatabase.save([order1, order2])


    await freelancer2.addSpecialty('Web Development', 10)
    await freelancer2.addSpecialty('Web Security', 3)
    await freelancer2.updateProfile('Turkey', 'I created Facebook')

    await freelancer2.finishOrder(order1)
    await freelancer2.startOrder(order2)

    await employer1.rateAndComment(job1, 4, 'Great job!')
    await employer1.rateAndComment(job2, 2, 'Shitty job!')

    await jobDatabase.update(job1)
    await jobDatabase.update(job2)
    await orderDatabase.update(order1)
    await orderDatabase.update(order2)

    await employerDatabase.update(employer1)
    await freelancerDatabase.update(freelancer1)
    await employerDatabase.update(employer2)
    await freelancerDatabase.update(freelancer2)

    const employer3 = Employer.create({ name: 'Employer3' })
    const employer4 = Employer.create({ name: 'Employer4' })
    const freelancer3 = Freelancer.create({ name: 'Freelancer3' })

    await employerDatabase.insert(employer3)
    await employerDatabase.insert(employer4)
    await freelancerDatabase.insert(freelancer3)

  } catch (e) {
    console.log(e)
  }
}

main()
