const jobService = require('../services/job-service')

async function searchJob(keyword) {
  try {
    const job = await jobService.findByKeyword(keyword)

    job.length
      ? console.log(`${keyword} için ${job.length} adet ilan bulundu`)
      : console.log(`${keyword} için sonuç bulunamadı`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = searchJob
