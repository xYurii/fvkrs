import { Command, Fvk } from "@structures/index";
import { IExecuteCommandOptions } from "@types";
import { Message } from "discord.js";

export default class PrefixCommand extends Command {
  constructor(client: Fvk) {
    super(client, {
      name: "prefix",
      onlyOwner: false,
      aliases: ["prefixo"],
    });
  }

  async execute({
    message,
    args,
  }: IExecuteCommandOptions): Promise<Message | undefined> {
    if (!message.member?.permissions.has("ManageGuild"))
      return message.reply(
        "você precisa da permissão de gerenciar servidor para alterar meu prefixo",
      );

    const regex = new RegExp(/^[A-z0-9~`!@#$%^&*()_+-={}|:;<>,.?\/']+$/);
    const prefix = args[0];

    if (!prefix || prefix?.length > 5 || !regex.test(prefix))
      return message.reply(
        "o prefixo pode ter até 5 caracteres, e não pode conter caracteres especiais.",
      );

    await this.client.db.guild.update(
      {
        prefix,
      },
      { where: { id: message.guild?.id } },
    );

    return message.reply(`prefixo alterado com sucesso para ${prefix}!`);
  }
}
