const { jobDatabase } = require('../database')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const jobs = await jobDatabase.load()

  res.render('jobs', { jobs })
})


router.get('/:jobId', async (req, res) => {
  const job = await jobDatabase.find(req.params.jobId)
  if (!job) return res.status(404).send('Cannot find job')
  res.render('job', { job })
})

module.exports = router