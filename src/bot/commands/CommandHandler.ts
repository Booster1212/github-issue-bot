import "reflect-metadata";
import { Client, Collection, Interaction } from "discord.js";
import { config } from "../../configs";
import fs from "fs";
import path from "path";
import { Routes } from "discord.js/node_modules/discord-api-types/v9";
import { REST } from "@discordjs/rest";
import { inject, singleton } from "tsyringe";

require("dotenv").config();


@singleton()
export default class CommandHandler {
  constructor(@inject("Client") private readonly client: Client) {
    this.client = client;
  }

  public async executor(): Promise<string | undefined> {
    if (!config.enableSlashCommands) {
      return Promise.resolve(
        "[INJECTION - index.js] ==> Slash commands are currently disabled."
      );
    }

    this.generateCommands();
    this.client.on('interactionCreate', this.handleInteraction.bind(this));
  }

  private async handleInteraction(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const command = this.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }

  private generateCommands() {
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

    this.loadCommands(commands);
  }

  private loadCommands(commands: any[]) {
    const rest = new REST({ version: "9" }).setToken(
      process.env.TOKEN as string
    );
    (async () => {
      try {
        await rest.put(
          Routes.applicationGuildCommands(
            process.env.BOT_ID ?? "",
            process.env.GUILD_ID ?? ""
          ),
          {
            body: commands,
          }
        );

        console.log("GitHub Issue Bot ==> Successfully initialized slash commands!");
      } catch (error) {
        console.error(error);
      }
    })();
  }
}
