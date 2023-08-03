import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'activitylogs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('user_id').notNullable()
      table.integer('book_id').notNullable()
      table.string('activity_type').notNullable()

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
