const knex = require('../database/database')

const getCircularReplacer = () => {
    const seen = new WeakSet()
    return (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return
            }
            seen.add(value)
        }
        return value
    }
}

async function add_log(id, status, message, created_at) {
    try{
        await knex('logs').insert({
            id: id,
            status: status,
            message: message,
            created_at: created_at,
        })
    }catch (error){
        console.error('Error adding log:', error)
        throw error
    }
}


async function list_log(status, created_at){
    try{
        let query = knex('logs')

    if (status){
        query.where('status', status)
    }
    if (created_at){
        query.where('created_at', '>=' ,created_at)
    }
    const result = await query
    return JSON.stringify(result, getCircularReplacer())
    
}catch (error){
        console.error('Error listing log:', error)
        throw error
    }
}
    

async function create_report() {
    try{
        const result = await knex
        .from('logs')
        .select('status')
        .count('* as count')
        .groupBy('status')
        for (let row of result) {
            if (row.status !== null && row.count !== undefined){
                await knex('report').insert({
                    status: row.status,
                    count: row.count,
                })
            }
        }
        return JSON.stringify(result, getCircularReplacer())
    }catch (error){
        console.error('Error creating report:', error)
        throw error
    }
    
}



module.exports = {
    add_log,
    list_log,
    create_report,
}
