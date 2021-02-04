const { freelancerService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const freelancers = await freelancerService.load()

  res.render('freelancers', { freelancers })
})

router.get('/:freelancerId', async (req, res) => {
  const freelancer = await freelancerService.find(req.params.freelancerId)
  if (!freelancer) return res.status(404).send('Cannot find freelancer')

  res.render('freelancer', { freelancer })
})

router.post('/', async (req, res) => {
  const { name, country, description, specialties } = req.body

  const freelancer = await freelancerService.insert({ name, country, description, specialties })

  res.send(freelancer)
})

router.post('/:freelancerId/specialty', async (req, res) => {
  const { freelancerId } = req.params
  const { field, experience } = req.body

  try {
    const specialty = await freelancerService.addSpecialty(freelancerId, field, experience)

    res.send(specialty)
  } catch (e) {
    return res.status(404).send('Cannot find freelancer')
  }
})

router.post('/:freelancerId/jobs', async (req, res) => {
  const { freelancerId } = req.params
  const { title, content, price, deliveryTime } = req.body

  try {
    const job = await freelancerService.createJob(freelancerId, title, content, price, deliveryTime)

    res.send(job)
  } catch (e) {
    return res.status(404).send('Server error')
  }
})

router.delete('/:freelancerId', async (req, res) => {
  const { freelancerId } = req.params

  const result = await freelancerService.removeBy('_id', freelancerId)

  res.send(result)
})

router.delete('/:freelancerId/jobs/:jobId', async (req, res) => {
  const { freelancerId, jobId } = req.params

  try {
    const result = await freelancerService.removeJob(freelancerId, jobId)

    res.send(result)
  } catch (e) {
    return res.status(404).send('Server error')
  }
})

router.patch('/:freelancerId/orders/:orderId/status', async (req, res) => {
  const { freelancerId, orderId } = req.params
  const { status } = req.body

  const result = await freelancerService.changeStatus(freelancerId, orderId, status)

  res.send(result)
})

router.patch('/:freelancerId/jobs/:jobId', async (req, res) => {
  const { freelancerId, jobId } = req.params
  const { title, content, price, deliveryTime } = req.body

  const job = await freelancerService.updateJob(freelancerId, jobId, title, content, price, deliveryTime)

  res.send(job)
})

router.patch('/:freelancerId', async (req, res) => {
  const { freelancerId } = req.params
  const { country, description } = req.body

  const updatedFreelancer = await freelancerService.update(freelancerId, { country, description })

  res.send(updatedFreelancer)
})

module.exports = router
