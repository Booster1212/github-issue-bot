import 'reflect-metadata';
import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { BOT, DISCORD, GITHUB } from "../configs/inversify.types";
import GitHubAPI from "./api/githubAPI";
import CommandHandler from './commands/CommandHandler';


@injectable()
export default class Bot {
  private client: Client;

  private readonly token: string;
  private readonly githubAPI: GitHubAPI;
  private readonly commandHandler: CommandHandler;

  constructor(
    @inject(DISCORD.Client) client: Client,
    @inject(DISCORD.Token) token: string,
    @inject(GITHUB.GithubAPI) githubAPI: GitHubAPI,
    @inject(BOT.CommandHandler) commandHandler: CommandHandler
  ) {
    this.client = client;
    this.token = token;
    this.githubAPI = githubAPI;
    this.commandHandler = commandHandler;
  }

  public listen(): Promise<string> {
    return this.client.login(this.token);
  }

  public listenToCommands() {
    return this.commandHandler.executeor();
  }

  public async createIssue(title: string, content: string) {
    await this.githubAPI.createIssue(title, content);
  }
}
