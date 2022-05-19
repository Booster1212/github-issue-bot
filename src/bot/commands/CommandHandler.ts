import "reflect-metadata";
import {
  Client,
  Collection,
  Message,
} from "discord.js";
import { inject, injectable } from "inversify";
import { config } from "../../configs";
import { BOT, DISCORD } from "../../configs/inversify.types";
import fs from "fs";
import path from "path";
import { Routes } from "discord.js/node_modules/discord-api-types/v9";
import { REST } from "@discordjs/rest";

@injectable()
export default class CommandHandler {
  private readonly botId: string;
  private readonly client: Client;
  private readonly guild: string;
  private readonly token: string;

  constructor(
    @inject(BOT.Id) botId: string,
    @inject(DISCORD.Client) client: Client,
    @inject(DISCORD.Guild) guild: string,
    @inject(DISCORD.Token) token: string
  ) {
    this.botId = botId;
    this.client = client;
    this.guild = guild;
    this.token = token;
  }

  public async executor(): Promise<string> {
    if (!config.enableChatCommands) {
      return Promise.resolve(
        "[INJECTION - index.js] ==> Chat commands are currently disabled."
      );
    }

    this.client.on("messageCreate", this.handleMessage);
    return Promise.resolve(
      "[INJECTION - index.js] ==> Listening to commands..."
    );
  }

  public async slashExecutor(): Promise<string> {
    if (!config.enableSlashCommands) {
      return Promise.resolve(
        "[INJECTION - index.js] ==> Slash commands are currently disabled."
      );
    }

    const commands: any[] = [];
    const commandsPath = path.join(__dirname, "./slash-commands");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    this.client.commands = new Collection();

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      commands.push(command.data.toJSON());
      this.client.commands.set(command.data.name, command);
    }

    console.log(JSON.stringify(commands));
    const rest = new REST({ version: "9" }).setToken(this.token);
    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
          Routes.applicationGuildCommands(this.botId, this.guild),
          {
            body: commands,
          }
        );

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();

    this.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = this.client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    });

    return Promise.resolve(
      "[INJECTION - index.js] ==> Listening to slash commands..."
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
