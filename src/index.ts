import Bot from "./bot";
import container from "./configs/inversify.config";
import { DISCORD } from "./configs/inversify.types";

const issueBot = container.get<Bot>(DISCORD.Bot);
issueBot.listen().then(() => {
  console.log("[Main - index.js] ==> Issue Bot started successfully!");
});

issueBot.listenToCommands().then((res) => {
  console.log(res);
});
