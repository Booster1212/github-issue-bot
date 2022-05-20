import "reflect-metadata";
import { Client } from "discord.js";

import CommandHandler from "./commands/CommandHandler";
import { container, inject, singleton } from "tsyringe";

require("dotenv").config();

@singleton()
export default class Bot {
  constructor(
    @inject("Client") private readonly client: Client,
    @inject("CommandHandler") private readonly commandHandler: CommandHandler
  ) {
    this.client = container.resolve("Client");
    this.commandHandler = container.resolve("CommandHandler");
  }

  public listen(): Promise<string> {
    return this.client.login(process.env.TOKEN as string);
  }

  public listenToSlashCommands(): Promise<string | undefined> {
    return this.commandHandler.executor();
  }
}
