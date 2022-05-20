import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { config } from "../../../configs";
import GitHubAPI from "../../api/githubAPI";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("issue")
    .setDescription("Creates an issue in the #issues channel")
    .addStringOption((option) =>
      option.setName("title").setDescription("Title of the issue").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("issue").setDescription("Description of the issue").setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    try {
      if(interaction.channelId !== config.issueChannel) {
        return interaction.reply({
          content: "You can only use this command in the #issues channel.",
          ephemeral: true,
        });
      }
      const title = interaction.options.data[0].value;
      const issue = interaction.options.data[1].value;

      const issueEmbed = new MessageEmbed()
        .setTitle("A new Issue has arrived!")
        .addField("Auto assignment", config.githubRepoUserName)
        .addField("Description of the issue", issue as string)
        .addField("Author", interaction.user.username)
        .addField("Labels", config.issueLabels.join(", "))
        .setThumbnail("https://git-scm.com/images/logos/1color-darkbg@2x.png");
      interaction.reply({ embeds: [issueEmbed] });

      await GitHubAPI.createIssue(title as string, issue as string);
    } catch (error) {
      console.log(error);
    }
  },
};
