import { DiscordEventListener, Fvk } from "@structures/index";
import { Events } from "discord.js";

export default class ReadyEvent extends DiscordEventListener {
  constructor(client: Fvk) {
    super(client, {
      name: Events.ClientReady,
      once: true,
    });
  }

  async execute(): Promise<undefined> {
    console.log(this.client.user?.username, "connected!");
  }
}
