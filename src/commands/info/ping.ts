import { Command, Fvk } from "@structures/index";
import { IExecuteCommandOptions } from "@types";
import { Message } from "discord.js";

export default class PingCommand extends Command {
  constructor(client: Fvk) {
    super(client, {
      name: "ping",
      onlyOwner: false,
    });
  }

  async execute({
    message,
  }: IExecuteCommandOptions): Promise<Message | undefined> {
    const msg = await message.reply("pong!");
    return msg;
  }
}
