import { Command, Fvk } from "@structures/index";
import { IExecuteCommandOptions } from "@types";
import { ClientUser, Message, version } from "discord.js";
import os from "node:os";

export default class BotInfoCommand extends Command {
  constructor(client: Fvk) {
    super(client, {
      name: "botinfo",
      onlyOwner: false,
      aliases: ["bot"],
    });
  }

  async execute({
    message,
  }: IExecuteCommandOptions): Promise<Message | undefined> {
    const user = this.client.user as ClientUser;
    const owner = await this.client.users.fetch("339314508621283329");

    const embeds = [
      {
        title: `**@${user.username}**`,
        description: `Olá ${message.author}! Eu me chamo **${user.username}** e sou um bot de entretenimento, estou em minhas primeiras versões mas coisas grandes estão por vir!`,
        color: 2807019,
        fields: [
          {
            name: "Informações técnicas",
            value: `Versão do discord.js: **${version}**\nVersão do node: **${
              process.version
            }**\n\n${this.getMemoryStats()}`,
          },
          {
            name: "Dono",
            value: owner.username + " - " + owner.id,
          },
        ],
      },
    ];

    return await message.reply({ embeds });
  }

  private getMemoryStats() {
    const total = this.bytesToMb(os.totalmem());
    const free = this.bytesToMb(os.freemem());
    const usage = process.memoryUsage();

    return (
      `Memória RAM total: **${total.toFixed(2)}mb**\n` +
      `Memória RAM livre: **${free.toFixed(2)}mb**\n` +
      `Uso de memória do processo:\n` +
      `- RSS: **${this.bytesToMb(usage.rss).toFixed(2)}mb**\n` +
      `- HEAP: **${this.bytesToMb(usage.heapTotal).toFixed(2)}mb**\n` +
      `- Heap Used: **${this.bytesToMb(usage.heapUsed).toFixed(2)}mb**\n`
    );
  }

  private bytesToMb(bytes: number): number {
    return bytes / (1024 * 1024);
  }
}
