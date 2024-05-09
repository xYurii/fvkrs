import { ICommand } from "@types";
import { Client, ClientOptions, Collection, Events } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

export class Fvk extends Client {
  declare prefix: string;
  declare commands: Collection<string, ICommand>;

  constructor(
    options: ClientOptions = { intents: 3276799, failIfNotExists: false },
  ) {
    super(options);
    this.prefix = "..";
    this.commands = new Collection<string, ICommand>();
  }

  async initializeClient() {
    await this.loadCommands();
    this.on(Events.ClientReady, (client) => {
      console.info(client.user.username + " connected.");
    });
    await this.login(process.env.CLIENT_TOKEN);
  }

  async loadCommands() {
    const dirs = readdirSync(join(__dirname, "..", "../commands"));

    dirs.forEach((dir) => {
      const commandsPath = readdirSync(
        join(__dirname, "..", `../commands/${dir}/`),
      );
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
