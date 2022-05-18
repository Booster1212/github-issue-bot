import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../configs/inversify.types";

@injectable()
export class Bot {
  private client: Client;
  private readonly token: string;
  private readonly githubToken: string;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.GitHubToken) githubToken: string
  ) {
    this.client = client;
    this.token = token;
    this.githubToken = githubToken;
  }

  public listen(): Promise<string> {
    return this.client.login(this.token);
  }

  public createIssue() {
    
  }
}
