const { jobService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const jobs = await jobService.load()

  res.send(jobs)
})

router.get('/:jobId', async (req, res) => {
  const job = await jobService.find(req.params.jobId)
  if (!job) return res.status(404).send('Cannot find job')

  res.send(job)
})

module.exports = router
