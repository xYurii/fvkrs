import { DiscordEventListener, Fvk } from "@structures/index";
import { Events, Message } from "discord.js";

export default class MessageUpdateEvent extends DiscordEventListener {
  constructor(client: Fvk) {
    super(client, {
      name: Events.MessageUpdate,
      once: true,
    });
  }

  async execute(oldMsg: Message, newMsg: Message): Promise<undefined> {
    if (oldMsg.author.bot) return;
    if (oldMsg.pinned !== newMsg.pinned) return;
    this.client.emit("messageCreate", newMsg);
  }
}
