import { Client, Message, MessageEmbed } from "discord.js";
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

      if (message.channelId !== config.issueChannel) {
        console.log("debugging");
        return;
      }

      if (!message.content.startsWith(config.commandPrefix)) return;

      const command = message.content
        .split(" ")[0]
        .slice(config.commandPrefix.length);
      if (command === "issue") {
        const commandArgs = message.content.split(" ").slice(1);
        const issue = commandArgs.join(" ");

        if (!issue) return;

        if (issue.length < config.issueMinLength) {
          message.channel.send("Issue must be at least 15 characters long");
          return;
        }

        const issueEmbed = new MessageEmbed()
          .setTitle("A new Issue has arrived!")
          .addField("Auto assignment", config.githubRepoUserName)
          .addField("Description of the issue", issue)
          .addField("Author", message.author.username)
          .addField("Labels", config.issueLabels.join(", "))
          .setThumbnail(
            "https://git-scm.com/images/logos/1color-darkbg@2x.png"
          );
        message.channel.send({ embeds: [issueEmbed] });

        bot.createIssue("AUTO GENERATED ISSUE -- Requires REVIEW!", issue);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
