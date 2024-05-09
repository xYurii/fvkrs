import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "blacklists",
  modelName: "b",
})
export default class Blacklist extends Model {
  @PrimaryKey
  @Unique
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
  })
  declare id: string;

  @BelongsTo(() => User, {
    foreignKey: "id",
    onDelete: "CASCADE",
  })
  declare user: User;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare authorId: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare reason: string;
}
