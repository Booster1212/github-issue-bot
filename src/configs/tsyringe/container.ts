import { Client, Intents } from "discord.js";
import { container } from "tsyringe";
import Bot from "../../bot";
import GitHubAPI from "../../bot/api/githubAPI";
import CommandHandler from "../../bot/commands/CommandHandler";

container.register("Client", {
  useValue: new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ],
  }),
});

container.registerSingleton("Bot", Bot);
container.registerSingleton("GithubAPI", GitHubAPI);
container.registerSingleton("CommandHandler", CommandHandler);
