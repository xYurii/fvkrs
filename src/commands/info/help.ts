import { Command, Fvk } from "@structures/index";
import { IExecuteCommandOptions } from "@types";
import { Message } from "discord.js";
import { readdirSync } from "node:fs";
import { join } from "node:path";

export default class HelpCommand extends Command {
  constructor(client: Fvk) {
    super(client, {
      name: "help",
      onlyOwner: false,
      aliases: ["ajuda"],
    });
  }

  async execute({
    message,
  }: IExecuteCommandOptions): Promise<Message | undefined> {
    const commandsDir = readdirSync(join(__dirname, "..", "../commands"));
    const fields = [];
    const translations: Record<string, string> = {
      info: "Informações",
      economy: "Economia",
    };

    for (const dir of commandsDir) {
      if (dir === "dev") continue;

      const commandsFiles = readdirSync(
        join(__dirname, "..", `../commands/${dir}`),
      );
      const commands = commandsFiles
        .map((command) => `\`${command.replace(/\.(ts|js)$/gi, "")}\``)
        .join(", ");
      fields.push({
        name: translations[dir] + " - " + commandsFiles.length,
        value: commands,
      });
    }

    const embeds = [
      {
        title: "Lista de comandos",
        description: "Veja todos os meus comandos abaixo.",
        color: 2807019,
        fields,
      },
    ];

    return message.reply({ embeds });
  }
}
