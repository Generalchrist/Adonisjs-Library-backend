import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ActivityLogModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public book_id: number

  @column()
  public activity_type: string

}
