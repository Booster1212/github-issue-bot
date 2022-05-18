import Bot from "./bot";
import CommandHandler from "./bot/commands";
import container from "./configs/inversify.config";
import { TYPES } from "./configs/inversify.types";

const IssueBot = container.get<Bot>(TYPES.Bot);
IssueBot.listen().then(() => {
  console.log("[Main - index.js] ==> Issue Bot started successfully!");
});

const commands = container.get<CommandHandler>(TYPES.CommandHandler);
commands.listenToCommands().then((res) => {
  console.log(res);
});
