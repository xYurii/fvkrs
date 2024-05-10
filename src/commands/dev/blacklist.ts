import { Command, Fvk } from "@structures/index";
import { IExecuteCommandOptions } from "@types";
import { Message } from "discord.js";

export default class BlacklistCommand extends Command {
  constructor(client: Fvk) {
    super(client, {
      name: "blacklist",
      onlyOwner: true,
      aliases: ["bl"],
    });
  }

  async execute({
    message,
    args,
  }: IExecuteCommandOptions): Promise<Message | undefined> {
    const user =
      message.mentions.users.first() ||
      (await this.client.users.fetch(args[1]).catch(() => null));

    if (!user) return message.reply("cadê o usuário nn sei");

    const data = await this.client.db.user.getOrCreate(user, {
      model: this.client.db.blacklist,
      as: "blacklist",
    });
    let wasBanned = false;

    if (["add"].includes(args[0]?.toLowerCase())) {
      if (data.blacklist) return message.reply("ixi o usuário tá banido já kk");
      await this.client.db.blacklist.create({
        id: user.id,
        reason: args?.slice(2).join(" ").slice(0, 200),
        authorId: message.author.id,
      });
      wasBanned = true;
    } else if (["rmv"].includes(args[0]?.toLowerCase())) {
      if (!data.blacklist)
        return message.reply("ixi o usuário é banido não kk");

      await this.client.db.blacklist.destroy({
        where: { id: user.id },
      });
    }

    message.reply(`o usuário foi ${wasBanned ? "banido" : "desbanido"} chefe.`);
  }
}
