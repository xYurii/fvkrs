import { DiscordEventListener, Fvk } from "@structures/index";
import { Events, Message } from "discord.js";

export default class ReadyEvent extends DiscordEventListener {
  constructor(client: Fvk) {
    super(client, {
      name: Events.MessageCreate,
      once: false,
    });
  }

  async execute(message: Message): Promise<undefined> {
    const prefix = this.client.prefix;
    if (
      !message.guild ||
      message.author.bot ||
      !message.content.startsWith(prefix)
    )
      return;

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

    await command.execute({ message, args });
  }
}
