import "reflect-metadata";
import { Client, Message } from "discord.js";
import { injectable } from "inversify";
import { config } from "../../configs";
import container from "../../configs/inversify.config";
import { DISCORD } from "../../configs/inversify.types";

@injectable()
export default class CommandHandler {
  public async executor(): Promise<string> {
    const client = container.get<Client>(DISCORD.Client);

    client.on("messageCreate", this.handleMessage);

    return Promise.resolve(
      "[INJECTION - index.js] ==> Listening to commands..."
    );
  }

  private handleMessage(message: Message, client?: Client, args?: string[]) {
    if (message.content.startsWith(config.commandPrefix)) {
      const command = message.content.split(" ")[0].slice(1);
      args = message.content.split(" ").slice(1);

      const commandFile = require(`./chat-commands/${command}.js`);
      commandFile.run(client, message, args);
    }
  }
}
