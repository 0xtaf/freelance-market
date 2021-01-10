const { jobDatabase } = require('../database')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/search/:keyword', async (req, res) => {
  const { keyword } = req.params

  try {
    const jobs = await jobDatabase.findByKeyword(keyword)
    if (typeof jobs == 'string') {
      console.log(jobs)
    } else {
      console.log(`${keyword} için ${jobs.length} adet ilan bulundu`)
    }
    res.render('search-results', { jobs })
  } catch (e) {
    console.log(e)
  }
  
})

module.exports = router