import "reflect-metadata";
import "./configs/tsyringe/container";
import { container } from "tsyringe";
import Bot from "./bot";

const issueBot = container.resolve(Bot);
issueBot.listen().then(() => {
  console.log("GitHub Issue Bot ==> started successfully!");
});

issueBot.listenToSlashCommands().then(() => {
  console.log("GitHub Issue Bot ==> Listening to Slash ('/') commands...");
});
