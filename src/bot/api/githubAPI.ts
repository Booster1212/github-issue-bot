import "reflect-metadata";
import axios from "axios";
import { inject, injectable } from "inversify";
import { config } from "../../configs";
import { GITHUB } from "../../configs/inversify.types";

@injectable()
export default class GitHubAPI {
  private readonly gitHubToken: string;

  constructor(@inject(GITHUB.GithubToken) gitHubToken: string) {
    this.gitHubToken = gitHubToken;
  }

  public async createIssue(title: string, content: string) {
    const options = {
      method: "post",
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
        Authorization: `token ${this.gitHubToken}`,
      },
    };
    await axios(options);
  }
}
