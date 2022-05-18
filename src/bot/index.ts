import 'reflect-metadata';
import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../configs/inversify.types";
import GitHubAPI from "./api/github";
import CommandHandler from "./commands";

@injectable()
export default class Bot {
  private client: Client;

  private readonly token: string;
  private readonly commandHandler: CommandHandler;
  private readonly githubAPI: GitHubAPI;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.CommandHandler) commandHandler: CommandHandler,
    @inject(TYPES.GithubAPI) githubAPI: GitHubAPI,
  ) {
    this.client = client;
    this.token = token;
    this.commandHandler = commandHandler;
    this.githubAPI = githubAPI;
  }

  public listen(): Promise<string> {
    return this.client.login(this.token);
  }
}
