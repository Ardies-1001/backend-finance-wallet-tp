import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Recharge extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public users_id: number

  @column()
  public montant: string

  @column()
  public date_recharge: DateTime


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  // dans le modèle Dépense  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
