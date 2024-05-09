import { User as DiscordUser } from "discord.js";
import { IncludeOptions } from "sequelize";
import {
  Column,
  DataType,
  Default,
  HasOne,
  Index,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Blacklist from "./blacklist.model";

@Table({
  tableName: "users",
  modelName: "user",
})
export default class User extends Model {
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

  @Default(0)
  @Column({
    type: DataType.BIGINT,
  })
  public reward!: 0;

  @HasOne(() => Blacklist)
  declare blacklist: Blacklist;

  static async getOrCreate(
    author: DiscordUser,
    ...relations: IncludeOptions[]
  ): Promise<User> {
    const user = await User.findOrCreate({
      where: { id: author.id },
      include: relations,
    });
    return user[0].toJSON();
  }
}
