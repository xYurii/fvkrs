import { Interaction, Message } from "discord.js";
import { Fvk } from "../index";

export abstract class DiscordEventListener {
  declare name: string;
  declare client: Fvk;
  declare once: boolean;

  constructor(client: Fvk, options: any) {
    this.name = options.name;
    this.client = client;
    this.once = options.once || false;
  }

  abstract execute(
    ...options: (Message | Interaction | undefined)[]
  ): Promise<Message | Interaction | undefined>;
}
