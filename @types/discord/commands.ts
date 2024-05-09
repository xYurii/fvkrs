import { Message } from "discord.js";

export type IExecuteCommandOptions = {
  message: Message;
  args?: string[];
};

export type ICommand = {
  name: string;
  aliases?: string[];
};
