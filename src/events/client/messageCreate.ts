import { DiscordEventListener, Fvk } from "@structures/index";
import { Events, Message } from "discord.js";

export default class MessageCreateEvent extends DiscordEventListener {
  constructor(client: Fvk) {
    super(client, {
      name: Events.MessageCreate,
      once: false,
    });
  }

  async execute(message: Message): Promise<undefined> {
    if (!message.guild || message.author.bot) return;

    const guildData = await this.client.db.guild.getOrCreate(message.guild.id);
    const prefix = guildData.prefix;

    if (
      message.content.match(new RegExp(`^<@!?${this.client.user?.id}>( |)$`))
    ) {
      message.reply(
        `Olá! Meu prefixo é \`${prefix}\`, use \`${prefix}help\` para ver meus comandos.`,
      );
      return;
    }
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args?.shift()?.toLowerCase();
    if (!commandName) return;

    const command = this.client.commands.find(
      (cmd) => cmd.name === commandName || cmd.aliases?.includes(commandName),
    );
    if (!command || !command.execute) return;
    if (
      command.onlyOwner &&
      !["339314508621283329"].includes(message.author.id)
    )
      return;

    const data = await this.client.db.user.getOrCreate(message.author, {
      model: this.client.db.blacklist,
      as: "blacklist",
    });
    if (data.blacklist) return;

    await command.execute({ message, args });
  }
}
