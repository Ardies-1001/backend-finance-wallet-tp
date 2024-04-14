import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'recharges'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('users_id').unsigned().references('users.id').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('montant').notNullable()
      table.date('date_recharge').notNullable()      
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
