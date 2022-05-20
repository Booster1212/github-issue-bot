import "reflect-metadata";
import axios from "axios";
import { config } from "../../configs";
import { singleton } from "tsyringe";

require("dotenv").config();

@singleton()
export default class GitHubAPI {
  public static async createIssue(title: string, content: string) {
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
        Authorization: `token ${process.env.GITHUB_TOKEN as string}`,
      },
    };
    await axios(options);
  }
}
