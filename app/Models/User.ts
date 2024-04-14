import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Depense from './Depense'
import Recharge from './Recharge'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  
  @column()
  public lastname: string

  @column()
  public firstname: string

  @column()
  public statut: 'client' | 'admin'

  @column()
  public email: string

  @column()
  public phone: string

  
  @column()
  public solde: number


  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  // dans le modèle User
  @hasMany(() => Depense)
  public depenses: HasMany<typeof Depense>
  
  @hasMany(() => Recharge)
  public recharge: HasMany<typeof Recharge>
}
