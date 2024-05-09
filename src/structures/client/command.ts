import { Message } from "discord.js";
import {
  ICommand,
  IExecuteCommandOptions,
} from "../../../@types/discord/commands";
import { Fvk } from "../index";

export abstract class Command {
  declare name: string;
  declare aliases?: string[];
  declare client: Fvk;

  constructor(client: Fvk, options: ICommand) {
    this.client = client;
    this.name = options.name;
    this.aliases = options.aliases || [];
  }

  abstract execute(
    options: IExecuteCommandOptions,
  ): Promise<Message | undefined>;
}
