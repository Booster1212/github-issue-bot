import Bot from "./bot";
import CommandHandler from "./bot/commands";
import container from "./configs/inversify.config";
import { TYPES } from "./configs/inversify.types";

const issueBot = container.get<Bot>(TYPES.Bot);
issueBot.listen().then(() => {
  console.log("[Main - index.js] ==> Issue Bot started successfully!");
});

const botCommands = container.get<CommandHandler>(TYPES.CommandHandler);
botCommands.listenToCommands().then((res) => {
  console.log(res);
});
