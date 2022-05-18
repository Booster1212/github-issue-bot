import axios from "axios";
import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { config } from "../configs";
import { TYPES } from "../configs/inversify.types";

@injectable()
export class Bot {
  private client: Client;
  private readonly token: string;
  private readonly gitHubToken: string;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.GitHubToken) gitHubToken: string
  ) {
    this.client = client;
    this.token = token;
    this.gitHubToken = gitHubToken;
  }

  public listen(): Promise<string> {
    return this.client.login(this.token);
  }

  public async createIssue(title: string, content: string) {
    const options = {
      method: 'post',
      url: `https://api.github.com/repos/${config.githubRepoUserName}/${config.githubRepoName}/issues`,
      data: {
        owner: config.githubRepoUserName,
        repo: config.githubRepoName,
        title: title,
        body: content,
        assignees: [config.githubRepoUserName],
        labels: config.issueLabels,
      },
      headers: {
        'Authorization': `token ${this.gitHubToken}`,
      }
    }
    await axios(options);
  }
}
