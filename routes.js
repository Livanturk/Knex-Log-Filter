const express = require('express')
const router = express.Router()
const logRoutes = require('./log/log.route')

// Add your routes here
router.use('/api', logRoutes)

module.exports = router

