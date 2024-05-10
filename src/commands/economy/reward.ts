import { Command, Fvk } from "@structures/index";
import { IExecuteCommandOptions } from "@types";
import { Message } from "discord.js";

export default class RewardCommand extends Command {
  constructor(client: Fvk) {
    super(client, {
      name: "reward",
      onlyOwner: false,
    });
  }

  async execute({
    message,
  }: IExecuteCommandOptions): Promise<Message | undefined> {
    const data = await this.client.db.user.getOrCreate(message.author);
    if (data.reward > Date.now())
      return message.reply(
        "você não pode coletar sua recompensa no momento, volte mais tarde.",
      );

    const randomNumber = Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000;
    await this.client.db.user.update(
      {
        money: Number(data.money) + randomNumber,
        reward: Date.now() + 3600000,
      },
      {
        where: { id: message.author.id },
      },
    );

    return message.reply(
      `hoje você coletou **${randomNumber.toLocaleString("pt-BR")}** moedas.`,
    );
  }
}
