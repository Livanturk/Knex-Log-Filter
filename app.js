const express = require('express')
const app = express()
const serverConfig = require('./config/server.config')

app.use(express.json())

// Add your middleware
const logMiddleware = require('./middleware/middleware')
app.use(logMiddleware)

// Add your routes
const logRoutes = require('./log/log.route')
app.use('/api', logRoutes)

app.listen(serverConfig.port, () => {
    console.log(`App listening on port ${serverConfig.port}`)
})
