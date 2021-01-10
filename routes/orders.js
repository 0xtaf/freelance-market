const { orderDatabase } = require('../database')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const orders = await orderDatabase.load()

  res.render('orders', { orders })
})


router.get('/:orderId', async (req, res) => {
  const order = await orderDatabase.find(req.params.orderId)
  if (!order) return res.status(404).send('Cannot find order')
  res.render('order', { order })
})

module.exports = router