import { ICommand, IExecuteCommandOptions } from "@types";
import { Message } from "discord.js";
import { Fvk } from "../index";

export abstract class Command {
  declare name: string;
  declare aliases?: string[];
  declare client: Fvk;
  declare onlyOwner: boolean;

  constructor(client: Fvk, options: ICommand) {
    this.client = client;
    this.name = options.name;
    this.aliases = options.aliases || [];
    this.onlyOwner = options.onlyOwner || false;
  }

  abstract execute(
    options: IExecuteCommandOptions,
  ): Promise<Message | undefined>;
}
