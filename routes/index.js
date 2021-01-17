const { jobService } = require('../services')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/search/:keyword', async (req, res) => {
  const { keyword } = req.params

  const jobs = await jobService.findByKeyword(keyword)

  res.render('search-results', { jobs })
})

module.exports = router
