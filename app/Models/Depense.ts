import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Depense extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public users_id: number
  
  @column()
  public objet: string
  
  @column()
  public description: string
  
  @column()
  public montant: string
  
  @column()
  public categorie: string

  @column()
  public date_depense: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  // dans le modèle Dépense  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
