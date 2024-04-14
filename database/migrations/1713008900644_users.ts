import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      
      table.increments('id').unsigned().primary()
      table.string('lastname').notNullable()
      table.string('firstname').notNullable()
      table.enum('statut', ["client", "admin"]).defaultTo("client")  
      table.string('email', 255).notNullable().unique()
      table.string('phone').notNullable()
      table.string('solde').defaultTo(0)
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
