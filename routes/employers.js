const { employerDatabase, jobDatabase, orderDatabase, freelancerDatabase } = require('../database')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const employers = await employerDatabase.load()

  res.render('employers', { employers })
})

router.get('/:employerId', async (req, res) => {
  const employer = await employerDatabase.find(req.params.employerId)
  if (!employer) return res.status(404).send('Cannot find employer')
  res.render('employer', { employer })
})

router.post('/', async (req, res) => {
  const employer = await employerDatabase.insert(req.body)
  res.send(employer)
})

router.post('/:employerId/jobs/:jobId', async (req, res) => {
  const employer = await employerDatabase.find(req.params.employerId)
  const job = await jobDatabase.find(req.params.jobId)

  const order = await employer.buy(job)
  await orderDatabase.insert(order)
  await jobDatabase.update(job)
  await employerDatabase.update(employer)
  await freelancerDatabase.update(job.freelancer)

  res.send(order)
})

router.post('/:employerId/jobs/:jobId/comments', async (req, res) => {
  const employer = await employerDatabase.find(req.params.employerId)
  const job = await jobDatabase.find(req.params.jobId)

  const { text, rating } = req.body
  const comment = await employer.comment(job, text, rating)
  await jobDatabase.update(job)

  res.send(comment)
})

router.delete('/:employerId', async (req, res) => {
  await employerDatabase.removeBy('id', req.params.employerId)

  res.send('OK')
})
module.exports = router
