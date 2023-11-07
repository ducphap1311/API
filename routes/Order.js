const express = require('express')
const router = express.Router()
const {getOrders, createOrder} = require('../controllers/Order')

router.route('/orders').get(getOrders)
router.route('/orders').post(createOrder)

module.exports = router