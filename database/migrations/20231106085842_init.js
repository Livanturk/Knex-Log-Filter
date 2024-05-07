/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('logs', table => {
        table.increments('id').primary()
        table.string('status', 20)
        table.string('message', 100)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('logs')
}
