const { userDatabase, employerDatabase, freelancerDatabase } = require('../database')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await userDatabase.load()

  res.render('users', { users })
})

router.post('/', async (req, res) => {
  const user = await userDatabase.insert(req.body)
  await employerDatabase.insert(user)
  await freelancerDatabase.insert(user)
  res.send(user)
})

router.delete('/:userId', async (req, res) => {
  await userDatabase.removeBy('id', req.params.userId)
  await employerDatabase.removeBy('id', req.params.userId)
  await freelancerDatabase.removeBy('id', req.params.userId)

  res.send('OK')
})

router.get('/:userId', async (req, res) => {
  const user = await userDatabase.find(req.params.userId)
  if (!user) return res.status(404).send('Cannot find user')
  res.render('user', { user })
})

router.post('/:userId/change-role', async (req, res) => {
  const { userId } = req.params
  const user = await userDatabase.find(userId)
  const employer = await employerDatabase.find(userId)
  const freelancer = await freelancerDatabase.find(userId)

  const message = user.changeRole()
  employer.changeRole()
  freelancer.changeRole()
  
  await userDatabase.update(user)
  await employerDatabase.update(employer)
  await freelancerDatabase.update(freelancer)

  res.send(message)
})


module.exports = router