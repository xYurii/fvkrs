import { Command, Fvk } from "@structures/index";
import { IExecuteCommandOptions } from "@types";
import { Message } from "discord.js";
import { Op } from "sequelize";

export default class LeaderboardCommand extends Command {
  constructor(client: Fvk) {
    super(client, {
      name: "leaderboard",
      onlyOwner: false,
      aliases: ["rank", "top"],
    });
  }

  async execute({ message }: IExecuteCommandOptions): Promise<Message> {
    const topUsers = await this.client.db.user.findAll({
      order: [["money", "DESC"]],
      limit: 10,
      raw: true,
      where: {
        money: {
          [Op.gt]: 0,
        },
      },
    });
    const top = await Promise.all(
      topUsers.map(async (data, index) => {
        const userFetch = await this.client.users
          .fetch(data.id)
          .catch(() => null);
        return `${index + 1}. **${userFetch?.username || "unk"}** ${Number(
          data.money,
        ).toLocaleString("pt-BR")} moedas`;
      }),
    );

    if (top.length <= 0)
      return message.reply("cadê ninguém no top que estranho");

    const embeds = [
      {
        title: "Rank de Moedas",
        description: top.join("\n"),
        color: 2807019,
      },
    ];

    return message.reply({ embeds });
  }
}
