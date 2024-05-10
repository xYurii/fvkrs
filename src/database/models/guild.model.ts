import {
  AllowNull,
  Column,
  DataType,
  Default,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

@Table({
  tableName: "guilds",
  modelName: "g",
})
export default class Guild extends Model {
  @PrimaryKey
  @Index("guild_idx")
  @Unique
  @Column({
    type: DataType.STRING(50),
  })
  declare id: string;

  @AllowNull(false)
  @Default("..")
  @Column({
    type: DataType.STRING(5),
  })
  declare prefix: string;

  static async getOrCreate(guildId: string): Promise<Guild> {
    const guild = await Guild.findOrCreate({
      where: { id: guildId },
    });
    return guild[0].toJSON();
  }
}
