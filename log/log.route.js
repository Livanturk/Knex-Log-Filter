const express = require('express')
const router = express.Router()
const log_controller = require('./log.controller')

router.post('/log', async (req, res) => {
    try {
        const { id, status, message, created_at } = req.body
        await log_controller.add_log(id, status, message, created_at)
        res.status(201).json({ message: 'Log added successfully' })
    } catch (error) {
        console.error('Error adding log:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})
router.get('/log', async (req, res) => {
    try{
        const status = req.query.status
    const created_at = req.query.created_at
    const logs = await log_controller.list_log(status, created_at)
    res.json({ logs: JSON.parse(logs)  })
    }catch (error){
        console.error('Error listing log:', error)
        res.status(500).json({ message: 'Internal server error' })
}})

router.get('/report', async (req, res) => {
    try{
        const report = await log_controller.create_report()
    res.json(JSON.parse(report))
    }catch (error){
        console.error('Error creating report:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router