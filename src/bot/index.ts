import "reflect-metadata";
import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { BOT, DISCORD } from "../configs/inversify.types";

import CommandHandler from "./commands/CommandHandler";

@injectable()
export default class Bot {
  private client: Client;

  private readonly token: string;
  private readonly commandHandler: CommandHandler;

  constructor(
    @inject(DISCORD.Client) client: Client,
    @inject(DISCORD.Token) token: string,
    @inject(BOT.CommandHandler) commandHandler: CommandHandler
  ) {
    this.client = client;
    this.token = token;
    this.commandHandler = commandHandler;
  }

  public listen(): Promise<string> {
    return this.client.login(this.token);
  }

  public listenToCommands() {
    return this.commandHandler.executor();
  }

  public listenToSlashCommands() {
    return this.commandHandler.slashExecutor();
  }
}
