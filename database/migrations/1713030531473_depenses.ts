import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'depenses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('users_id').unsigned().references('users.id').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('objet').notNullable()      
      table.text('description').notNullable()
      table.string('montant').notNullable()
      table.string('categorie').notNullable()
      table.date('date_depense').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
