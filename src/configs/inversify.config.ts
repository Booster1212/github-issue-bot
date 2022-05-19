require("dotenv").config(); // Load dotenv variables (recommend, e.g. for GitHub API token)

import { Client, Intents } from "discord.js";
import { Container } from "inversify";
import Bot from "../bot";
import GitHubAPI from "../bot/api/githubAPI";
import CommandHandler from "../bot/commands/CommandHandler";
import { BOT, DISCORD, GITHUB } from "./inversify.types";

let container = new Container();

container.bind<Bot>(DISCORD.Bot).to(Bot).inSingletonScope();
container.bind<Client>(DISCORD.Client).toConstantValue(
  new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ],
  })
);

container.bind<string>(DISCORD.Token).toConstantValue(process.env.TOKEN ?? "");

container
  .bind<string>(GITHUB.GithubToken)
  .toConstantValue(process.env.GITHUB_TOKEN ?? "");

container.bind<CommandHandler>(BOT.CommandHandler).to(CommandHandler);

container.bind<GitHubAPI>(GITHUB.GithubAPI).to(GitHubAPI);

export default container;
