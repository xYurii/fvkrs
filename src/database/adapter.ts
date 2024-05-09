import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import UserModel from "./models/user.model";

export class SequelizeAdapter extends Sequelize {
  public declare user: typeof UserModel;

  constructor(options: SequelizeOptions) {
    super(options);
    this.user = UserModel;
  }

  async initialize() {
    await this.authenticate();
    await this.sync({ alter: true });
  }
}
