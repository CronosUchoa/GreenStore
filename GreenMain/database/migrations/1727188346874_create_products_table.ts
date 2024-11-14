import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.decimal('price').notNullable()
      table.text('description').notNullable()
      table.text('image').notNullable()
      table.integer('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE')
      table.integer('device_id').unsigned().notNullable().references('id').inTable('devices').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
