const { jobService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const jobs = await jobService.load()

  res.render('jobs', { jobs })
})

router.get('/:jobId', async (req, res) => {
  const job = await jobService.find(req.params.jobId)
  if (!job) return res.status(404).send('Cannot find job')
  res.render('job', { job })
})

router.patch('/:jobId', async (req, res) => {
  const { jobId } = req.params
  const { name } = req.body

  const updatedJob = await employerService.update(jobId, { name })

  res.send(updatedJob)
})

module.exports = router
