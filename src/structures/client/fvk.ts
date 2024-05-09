import { ICommand } from "@types";
import { Client, ClientOptions, Collection } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { db } from "../../database/db";
import { DiscordEventListener } from "./event";

export class Fvk extends Client {
  declare prefix: string;
  declare commands: Collection<string, ICommand>;
  declare db: typeof db;

  constructor(
    options: ClientOptions = { intents: 3276799, failIfNotExists: false },
  ) {
    super(options);
    this.prefix = "..";
    this.commands = new Collection<string, ICommand>();
    this.db = db;
  }

  async initializeClient() {
    await this.db.initialize().then(() => console.info("database connected."));
    await this.loadCommands();
    await this.loadEvents();
    return await this.login(process.env.CLIENT_TOKEN);
  }

  async loadEvents() {
    const dirs = readdirSync(join(__dirname, "..", "../events/client/")).filter(
      (file) => {
        const regex = /\.(js|ts)$/;
        return regex.test(file);
      },
    );

    dirs.forEach(async (file) => {
      const { default: ClientEvent } = await import(
        join(__dirname, "..", `../events/client/${file}`)
      );
      const event: DiscordEventListener = new ClientEvent(this);
      this[event.once ? "once" : "on"](event.name, (...args) =>
        event.execute(...args),
      );
    });
  }

  async loadCommands() {
    const dirs = readdirSync(join(__dirname, "..", "../commands"));

    dirs.forEach((dir) => {
      const commandsPath = readdirSync(
        join(__dirname, "..", `../commands/${dir}/`),
      ).filter((file) => {
        const regex = /\.(js|ts)$/;
        return regex.test(file);
      });

      commandsPath.forEach(async (commandDir) => {
        const filePath = join(
          __dirname,
          "..",
          `../commands/${dir}/${commandDir}`,
        );

        const { default: commandClass } = await import(filePath);
        const command: ICommand = new commandClass(this);

        if (command.name) this.commands.set(command.name, command);
      });
    });
  }
}
