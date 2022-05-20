# Discord - GitHub Issue Bot

Simple Bot to create Issues on a repository through discord, powerd by DiscordJS & Tsyringe.

## Getting Started

- You will need a discord which can be created through Discord's Developer Portal, the bot must have an OAuth2 Scope of bot & application.commands at least.

- Clone the repository
- Install node_modules (npm install / npm i)
- Create a .env file in the root folder (no extension) - Do not push this to github ever!

## Configuration

- The .env file

```ts
BOT_ID=<BotClientID> // without < >
TOKEN=<YourBotToken> // From Discord Dev Portal without < >
GITHUB_TOKEN=<YourGithubAccessToken> // without < >
GUILD_ID=<YourDiscordServerID> // without < >
```

- The default configuration file

```ts
export const config = {
  enableSlashCommands: true, // Recommend currently.

  githubRepoUserName: "Booster1212", // Your Github Username
  githubRepoName: "github-issue-bot", // The repository you want the issue to sent to.

  issueChannel: "976164749572194335", // Discord Channel where the /issue command should work
  issueLabels: ["bug", "enhancement"], // Labels of your Github Repository are valid here.
};
```

### Executing program

- Build before you try to start the bot!

```
- npm run build
- npm run start
```

- If everything is setup correctly and your Bot is online & properly configured you should be able to use it!

```ts
/issue 'TITLE' 'DESCRIPTION' // Command Params.
```

## Help

- If you need help with something or i forgot something, feel free to open a issue.

## Contribute to this Repository

- If you want to contribute something to this bot system, you are very welcome to do so by creating a pull request, you can of course also submit bugs or feature requests via the GitHub issue system!

## Authors
* Booster1212

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details

## Buy me a coffee
<p align="left">
 <a href="https://www.paypal.com/donate/?hosted_button_id=V7L7S57VACCQQ">
 <img src="https://raw.githubusercontent.com/andreostrovsky/donate-with-paypal/master/PNG/blue.png" style="width:512px"/>
