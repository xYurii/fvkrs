import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import Blacklist from "./models/blacklist.model";
import Guild from "./models/guild.model";
import UserModel from "./models/user.model";

export class SequelizeAdapter extends Sequelize {
  public declare user: typeof UserModel;
  public declare blacklist: typeof Blacklist;
  public declare guild: typeof Guild;

  constructor(options: SequelizeOptions) {
    super(options);
    this.user = UserModel;
    this.blacklist = Blacklist;
    this.guild = Guild;
  }

  async initialize() {
    await this.authenticate();
    await this.sync({ alter: true });
  }
}
