import { Command, Fvk } from "@structures/index";
import { IExecuteCommandOptions } from "@types";
import { Message } from "discord.js";

export default class BalanceCommand extends Command {
  constructor(client: Fvk) {
    super(client, {
      name: "bal",
      onlyOwner: false,
    });
  }

  async execute({
    message,
  }: IExecuteCommandOptions): Promise<Message | undefined> {
    const user = message.mentions.users.first() || message.author;
    const data = await this.client.db.user.getOrCreate(user);

    return message.reply(
      `${user.id === message.author.id ? "você" : user} possui **${Number(
        data.money,
      ).toLocaleString("pt-BR")}** moedas.`,
    );
  }
}
