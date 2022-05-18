require("dotenv").config(); // Recommended way of loading dotenv

import { Client, Intents } from "discord.js";
import { Container } from "inversify";
import { Bot } from "../bot";
import { TYPES } from "./inversify.types";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container
  .bind<Client>(TYPES.Client)
  .toConstantValue(
    new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
      ],
    })
  );
container
  .bind<string>(TYPES.Token)
  .toConstantValue(process.env.TOKEN as string);
container
  .bind<string>(TYPES.GitHubToken)
  .toConstantValue(process.env.GitHubToken as string);

export default container;
