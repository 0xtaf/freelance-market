const jobDatabase = require('../database/job-database')

async function searchJob(keyword){
  try {
    const job = await jobDatabase.findByKeyword(keyword)
    job.length 
      ? console.log(`${keyword} için ${job.length} adet ilan bulundu`) 
      : console.log(`${keyword} için sonuç bulunamadı`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = searchJob