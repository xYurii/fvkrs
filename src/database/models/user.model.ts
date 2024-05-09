import {
  Column,
  DataType,
  Default,
  Index,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  modelName: "user",
})
export default class UserModel extends Model {
  @Index("user_idx")
  @PrimaryKey
  @Column({
    type: DataType.STRING(100),
  })
  public declare id: string;

  @Default(0)
  @Column({
    type: DataType.BIGINT,
  })
  public money!: 0;
}
