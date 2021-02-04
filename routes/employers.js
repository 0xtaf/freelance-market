const { employerService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const employers = await employerService.load()
  res.render('employers', { employers })
})

router.get('/:employerId', async (req, res) => {
  const employer = await employerService.find(req.params.employerId)
  if (!employer) return res.status(404).send('Cannot find employer')

  res.render('employer', { employer })
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const employer = await employerService.insert({ name })

  res.send(employer)
})

router.post('/:employerId/jobs/:jobId', async (req, res) => {
  const { employerId, jobId } = req.params

  const order = await employerService.buy(employerId, jobId)

  res.send(order)
})

router.post('/:employerId/jobs/:jobId/comments', async (req, res) => {
  const { employerId, jobId } = req.params
  const { text, rating } = req.body

  try {
    const comment = await employerService.comment(employerId, jobId, text, rating)
    res.send(comment)
  } catch (e) {
    return res.status(404).send('Cannot find the job')
  }
})

router.delete('/:employerId', async (req, res) => {
  const { employerId } = req.params

  const result = await employerService.removeBy('_id', employerId)

  res.send(result)
})

router.patch('/:employerId', async (req, res) => {
  const { employerId } = req.params
  const { name } = req.body

  const updatedEmployer = await employerService.update(employerId, { name })

  res.send(updatedEmployer)
})

module.exports = router
