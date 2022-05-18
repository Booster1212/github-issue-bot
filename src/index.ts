import { Client, Message } from "discord.js";
import "reflect-metadata";
import { Bot } from "./bot";
import { config } from "./configs";
import container from "./configs/inversify.config";
import { TYPES } from "./configs/inversify.types";

let bot = container.get<Bot>(TYPES.Bot);
bot
  .listen()
  .then(() => {
    let client = container.get<Client>(TYPES.Client);

    console.log("GitHub Issue Bot is ready!");

    client.on("messageCreate", (message: Message) => {
      if (message.author.bot) return;

      if (!message.content.startsWith(config.commandPrefix)) return;
      const command = message.content
        .split(" ")[0]
        .slice(config.commandPrefix.length);
      if (command === "issue") {
        const args = message.content.split(" ").slice(1);
        const issue = args.join(" ");
        if (!issue) return;
        message.channel.send(`Issue: ${issue}`);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
