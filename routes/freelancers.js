const { freelancerDatabase, jobDatabase, orderDatabase } = require('../database')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const freelancers = await freelancerDatabase.load()

  res.render('freelancers', { freelancers })
})

router.get('/:freelancerId', async (req, res) => {
  const freelancer = await freelancerDatabase.find(req.params.freelancerId)
  if (!freelancer) return res.status(404).send('Cannot find freelancer')
  res.render('freelancer', { freelancer })
})

router.post('/', async (req, res) => {
  const freelancer = await freelancerDatabase.insert(req.body)
  res.send(freelancer)
})

router.post('/:freelancerId/specialty', async (req, res) => {
  const freelancer = await freelancerDatabase.find(req.params.freelancerId)
  if (!freelancer) return res.status(404).send('Cannot find freelancer')

  const { field, experience } = req.body
  freelancer.addSpecialty(field, experience)
  await freelancerDatabase.update(freelancer)
  res.send('Added new specialty')
})

router.post('/:freelancerId', async (req, res) => {
  const freelancer = await freelancerDatabase.find(req.params.freelancerId)
  if (!freelancer) return res.status(404).send('Cannot find freelancer')

  const { country, description } = req.body
  await freelancer.updateProfile(country, description)
  await freelancerDatabase.update(freelancer)
  res.send('Updated profile')
})

router.post('/:freelancerId/jobs', async (req, res) => {
  const freelancer = await freelancerDatabase.find(req.params.freelancerId)
  if (!freelancer) return res.status(404).send('Cannot find freelancer')

  const job = await freelancer.createJob(req.body)
  await jobDatabase.insert(job)
  await freelancerDatabase.update(freelancer)
  res.send('Added a new job')
})


router.post('/:freelancerId/orders/:orderId/status', async (req, res) => {
  const freelancer = await freelancerDatabase.find(req.params.freelancerId)
  if (!freelancer) return res.status(404).send('Cannot find freelancer')
  const order = await orderDatabase.find(req.params.orderId)
  if (!order) return res.status(404).send('Cannot find order')
  const { status } = req.body

  switch (status) {
    case 0:
      freelancer.resetOrder(order)
      break;
    case 1:
      freelancer.startOrder(order)
      break;
    case 2:
      freelancer.finishOrder(order)
      break;
    case 3:
      freelancer.cancelOrder(order)
      break;
    default:
      res.send('Error')
      break;
    }

  await orderDatabase.update(order)
  res.send('Order\'s status has changed')
})

router.delete('/:freelancerId', async (req, res) => {
  await freelancerDatabase.removeBy('id', req.params.freelancerId)

  res.send('OK')
})

router.delete('/:freelancerId/jobs/:jobId', async (req, res) => {
  const freelancer = await freelancerDatabase.find(req.params.freelancerId)
  if (!freelancer) return res.status(404).send('Cannot find freelancer')

  await freelancer.removeJob(req.params.jobId)
  await freelancerDatabase.update(freelancer)
  await jobDatabase.removeBy('id', req.params.jobId)

  res.send('OK')
})

router.put('/:freelancerId/jobs/:jobId', async (req, res) => {
  const freelancer = await freelancerDatabase.find(req.params.freelancerId)
  if (!freelancer) return res.status(404).send('Cannot find freelancer')

  const job = await freelancer.updateJob(req.params.jobId, req.body)
  await jobDatabase.update(job)
  await freelancerDatabase.update(freelancer)
  res.send('Updated the job')

})

module.exports = router