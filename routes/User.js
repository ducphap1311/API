const express = require('express')
const router = express.Router()
const {register, login,dashboard} = require('../controllers/user')
const authenticateUser = require('../middlewares/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/dashboard').get(authenticateUser, dashboard)
module.exports = router