import { Command, Fvk } from "@structures/index";
import { IExecuteCommandOptions } from "@types";
import { Message, codeBlock } from "discord.js";
import { inspect } from "node:util";

export default class PingCommand extends Command {
  constructor(client: Fvk) {
    super(client, {
      name: "eval",
      aliases: ["ev", "e"],
      onlyOwner: true,
    });
  }

  async execute({
    message,
    args,
  }: IExecuteCommandOptions): Promise<Message | undefined> {
    const code = args.join(" ").replace(/^`{3}(js|ts)?|`{3}$/g, "");
    if (code.includes("this.client.token")) return message.reply("eh mole");

    let response;
    try {
      response = await eval(`async () => {${code}}`)();
      if (typeof response !== "string") response = await inspect(response);
    } catch (error: unknown) {
      response = (error as Error).message;
    }

    const content = codeBlock<"js", typeof response>(
      "js",
      response
        .replace(new RegExp(`^${process.env.CLIENT_TOKEN}$`, "g"), "not today.")
        .slice(0, 1990),
    );

    return await message.reply({ content });
  }
}
